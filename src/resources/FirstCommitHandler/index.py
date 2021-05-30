import os
import json
import boto3
import cfnresponse

def lambda_handler(event, context):
    if(event['RequestType'] == 'Create'):
        code_commit_client = boto3.client('codecommit')
        code_commit_client.create_commit(repositoryName=os.environ['repo_name'],branchName=os.environ['branch_name'],commitMessage='Initial Commit',putFiles=[{'filePath': 'README.md','fileMode': 'NORMAL','fileContent': os.environ['readme_contents']}])
    responseValue = 120
    responseData = {}
    responseData['Data'] = responseValue
    cfnresponse.send(event, context, cfnresponse.SUCCESS, responseData)