import json
import os
import zipfile
from io import BytesIO

import boto3


def get_clients():
    s3_client = boto3.resource("s3")
    sts_connection = boto3.client("sts")
    cross_account = sts_connection.assume_role(RoleArn=os.environ["role"],RoleSessionName="session")
    access_key = cross_account["Credentials"]["AccessKeyId"]
    secrect_key = cross_account["Credentials"]["SecretAccessKey"]
    session_token = cross_account["Credentials"]["SessionToken"]
    databrew_client = boto3.client(
        "databrew",
        aws_access_key_id=access_key,
        aws_secret_access_key=secrect_key,
        aws_session_token=session_token,
    )
    return s3_client, databrew_client

def get_name_contents(event, s3_client):
    s3_location = event["CodePipeline.job"]["data"]["inputArtifacts"][0]["location"]["s3Location"]
    s3_bucket = s3_location["bucketName"]
    s3_file = s3_location["objectKey"]
    zip_obj = s3_client.Object(bucket_name=s3_bucket, key=s3_file)
    # extracting compressed files
    buffer = BytesIO(zip_obj.get()["Body"].read())
    file_name = ""
    z = zipfile.ZipFile(buffer)
    json_content = ""
    for filename in z.namelist():
        if filename.endswith(".json"):
            file_name = filename
            with z.open(file_name) as content:
                json_content = json.load(content)
    return file_name.replace(".json", ""), json_content

def lambda_handler(event, context):
    codepipeline_client = boto3.client("codepipeline")
    job_id = event["CodePipeline.job"]["id"]
    try:
        # client creation
        clients = get_clients()
        s3_client = clients[0]
        databrew_client = clients[1]
        # getting file name and contents
        name_contents = get_name_contents(event, s3_client)
        recipe_lists = databrew_client.list_recipes(MaxResults=99)
        if name_contents[0] not in (x["Name"] for x in recipe_lists["Recipes"]):
            databrew_client.create_recipe(Name=name_contents[0], Steps=name_contents[1])
        # updating recipe
        databrew_client.update_recipe(Description="updating recipe",Name=name_contents[0],Steps= name_contents[1])
        # publishing a recipe
        databrew_client.publish_recipe(Description="publishing recipe", Name=name_contents[0])
        # Notify AWS CodePipeline of a successful job
        codepipeline_client.put_job_success_result(jobId=job_id)
    except Exception as e:
        # Notifying pipeline of a failure
        codepipeline_client.put_job_failure_result(jobId=job_id,failureDetails={"type": "JobFailed","message": str(e)})
