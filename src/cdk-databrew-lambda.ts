import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';


const functionScript = 'import os\r\nimport json\r\nimport zipfile\r\nimport boto3\r\nimport gzip\r\nfrom io import BytesIO\r\n\r\ndef get_clients():\r\n    s3_client = boto3.resource(\'s3\')\r\n    sts_connection = boto3.client(\'sts\')\r\n    cross_account = sts_connection.assume_role(RoleArn=os.environ[\'role\'],RoleSessionName=\"session\")\r\n    access_key = cross_account[\'Credentials\'][\'AccessKeyId\']\r\n    secrect_key = cross_account[\'Credentials\'][\'SecretAccessKey\']\r\n    session_token = cross_account[\'Credentials\'][\'SessionToken\']\r\n    databrew_client = boto3.client(\r\n        \'databrew\',\r\n        aws_access_key_id=access_key,\r\n        aws_secret_access_key=secrect_key,\r\n        aws_session_token=session_token,\r\n    )\r\n    return s3_client, databrew_client\r\n\r\ndef get_name_contents(event, s3_client):\r\n    s3_location = event[\'CodePipeline.job\'][\'data\'][\'inputArtifacts\'][0][\'location\'][\'s3Location\']\r\n    s3_bucket = s3_location[\'bucketName\']\r\n    s3_file = s3_location[\'objectKey\']\r\n    zip_obj = s3_client.Object(bucket_name=s3_bucket, key=s3_file)\r\n    # extracting compressed files\r\n    buffer = BytesIO(zip_obj.get()[\"Body\"].read())\r\n    file_name = \'\'\r\n    z = zipfile.ZipFile(buffer)\r\n    json_content = \'\'\r\n    for filename in z.namelist():\r\n        if filename.endswith(\'.json\'):\r\n            file_name = filename\r\n            with z.open(file_name) as content:\r\n                json_content = json.load(content)\r\n    return file_name.replace(\'.json\', \'\'), json_content\r\n\r\ndef lambda_handler(event, context):\r\n    codepipeline_client = boto3.client(\'codepipeline\')\r\n    job_id = event[\'CodePipeline.job\'][\'id\']\r\n    try:\r\n        # client creation\r\n        clients = get_clients()\r\n        s3_client = clients[0]\r\n        databrew_client = clients[1]\r\n        # getting file name and contents\r\n        name_contents = get_name_contents(event, s3_client)\r\n        recipe_lists = databrew_client.list_recipes(MaxResults=99)\r\n        if name_contents[0] not in (x[\'Name\'] for x in recipe_lists[\'Recipes\']):\r\n            databrew_client.create_recipe(Name=name_contents[0], Steps=name_contents[1])\r\n        # updating recipe\r\n        databrew_client.update_recipe(Description=\'updating recipe\',Name=name_contents[0],Steps= name_contents[1])\r\n        # publishing a recipe\r\n        databrew_client.publish_recipe(Description=\'publishing recipe\', Name=name_contents[0])\r\n        # Notify AWS CodePipeline of a successful job\r\n        codepipeline_client.put_job_success_result(jobId=job_id)\r\n    except Exception as e:\r\n        # Notifying pipeline of a failure\r\n        codepipeline_client.put_job_failure_result(jobId=job_id,failureDetails={\'type\': \'JobFailed\',\'message\': str(e)})';

export interface PreProductionLambdaProps {
  /**
     * The ARN of the S3 bucket for the DataBrew CICD pipeline.
     */
  readonly bucketArn: string;
  /**
   * The ARN of the IAM role in the pre-production account.
   */
  readonly preproductionIamRoleArn: string;
  /**
   * The name of the IAM role for the pre-produciton Lambda function.
   *
   * @default 'PreProd-DataBrew-Recipe-Deployer-role'
   * */
  readonly roleName?: string;
  /**
   * The Lambda funciton name for the pre-production account
   *
   * @default 'PreProd-DataBrew-Recipe-Deployer'
   * */
  readonly functionName?: string;
}

export class PreProductionLambda extends cdk.Construct {
  /**
     * The name of the IAM role for the pre-produciton Lambda function.
     */
  readonly roleName: string;
  /**
     * The Lambda funciton name for the pre-production account.
     */
  readonly functionName: string;
  /**
     * The representative of Lambda function for the pre-production account.
     */
  readonly function: lambda.IFunction;
  constructor(scope: cdk.Construct, name: string, props: PreProductionLambdaProps) {
    super(scope, name);
    this.roleName = props.roleName ?? 'PreProd-DataBrew-Recipe-Deployer-role';
    this.functionName = props.functionName ?? 'PreProd-DataBrew-Recipe-Deployer';

    const lambdaRole = new iam.Role(this, 'PreproductionFunctionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'An execution role for the pre-production Lambda funciton.',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'),
        new iam.ManagedPolicy(this, 'PreProductionManagedPolicy', {
          managedPolicyName: 'PreProd-DataBrew-Recipe-Deployer-Policy',
          statements: [
            new iam.PolicyStatement({
              sid: 'CodePipelinePermissions',
              effect: iam.Effect.ALLOW,
              actions: [
                'codepipeline:PutJobFailureResult',
                'codepipeline:PutJobSuccessResult',
              ],
              resources: ['*'],
            }),
            new iam.PolicyStatement({
              sid: 'S3BucketPermissions',
              effect: iam.Effect.ALLOW,
              actions: ['s3:GetObject'],
              resources: [`${props.bucketArn}/*`],
            }),
            new iam.PolicyStatement({
              sid: 'AssumeRolePermission',
              effect: iam.Effect.ALLOW,
              actions: ['sts:AssumeRole'],
              resources: [props.preproductionIamRoleArn],
            }),
          ],
        }),
      ],
      roleName: this.roleName,
    });

    const preproductionFunction = new lambda.Function(this, 'PreProductionFunction', {
      functionName: this.functionName,
      description: 'Read from latest commit and publish AWS Glue DataBrew recipe to pre-prod account',
      logRetention: logs.RetentionDays.THREE_MONTHS,
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromInline(functionScript),
      handler: 'index.lambda_handler',
      environment: { role: props.preproductionIamRoleArn },
      memorySize: 128,
      role: lambdaRole,
      timeout: cdk.Duration.seconds(20),
      tracing: lambda.Tracing.ACTIVE,
    });
    this.function = preproductionFunction;
  }
}


export interface ProductionLambdaProps {
  /**
   * The ARN of the S3 bucket for the DataBrew CICD pipeline.
   */
  readonly bucketArn: string;
  /**
   * The ARN of the IAM role in the production account.
   * */
  readonly productionIamRoleArn: string;
  /**
   * The name of the IAM role for the produciton Lambda function.
   *
   * @default 'Prod-DataBrew-Recipe-Deployer-role'
   * */
  readonly roleName?: string;
  /**
   * The Lambda funciton name for the production account.
   *
   * @default 'Prod-DataBrew-Recipe-Deployer'
   * */
  readonly functionName?: string;
}


export class ProductionLambda extends cdk.Construct {
  /**
     * The name of the IAM role for the produciton Lambda function.
     */
  readonly roleName: string;
  /**
     * The Lambda funciton name for the production account.
     */
  readonly functionName: string;
  /**
     * The representative of Lambda function for the production account.
     */
  readonly function: lambda.IFunction;
  constructor(scope: cdk.Construct, name: string, props: ProductionLambdaProps) {
    super(scope, name);
    this.roleName = props.roleName ?? 'Prod-DataBrew-Recipe-Deployer-role';
    this.functionName = props.functionName ?? 'Prod-DataBrew-Recipe-Deployer';

    const lambdaRole = new iam.Role(this, 'ProductionFunctionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'An execution role for the production Lambda funciton.',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'),
        new iam.ManagedPolicy(this, 'ProductionLambdaMangedPolicuy', {
          managedPolicyName: 'Prod-DataBrew-Recipe-Deployer-Policy',
          statements: [
            new iam.PolicyStatement({
              sid: 'CodePipelinePermissions',
              effect: iam.Effect.ALLOW,
              actions: [
                'codepipeline:PutJobFailureResult',
                'codepipeline:PutJobSuccessResult',
              ],
              resources: ['*'],
            }),
            new iam.PolicyStatement({
              sid: 'S3BucketPermissions',
              effect: iam.Effect.ALLOW,
              actions: ['s3:GetObject'],
              resources: [`${props.bucketArn}/*`],
            }),
            new iam.PolicyStatement({
              sid: 'AssumeRolePermission',
              effect: iam.Effect.ALLOW,
              actions: ['sts:AssumeRole'],
              resources: [props.productionIamRoleArn],
            }),
          ],
        }),
      ],
      roleName: this.roleName,
    });

    const productionFunction = new lambda.Function(this, 'ProductionFunction', {
      functionName: this.functionName,
      description: 'Read from latest commit and publish AWS Glue DataBrew recipe to production account',
      logRetention: logs.RetentionDays.THREE_MONTHS,
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromInline(functionScript),
      handler: 'index.lambda_handler',
      environment: { role: props.productionIamRoleArn },
      memorySize: 128,
      role: lambdaRole,
      timeout: cdk.Duration.seconds(20),
      tracing: lambda.Tracing.ACTIVE,
    });
    this.function = productionFunction;
  }
}

export interface FirstCommitHandlerProps {
  /**
   * The ARN of the CodeCommit repository.
   */
  readonly codeCommitRepoArn: string;
  /**
   * The name of the CodeCommit repo.
   */
  readonly repoName: string;
  /**
   * The branch name used in the CodeCommit repo.
   */
  readonly branchName: string;
  /**
   * The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit.
   *
   * @default 'LambdaForInitialCommitRole'
   * */
  readonly roleName?: string;
  /**
   * The name of the Lambda function which deals with first commit via AWS CodeCommit.
   * @default 'FirstCommitHandler'
   * */
  readonly functionName?: string;
}

export class FirstCommitHandler extends cdk.Construct {
  /**
   * The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit.
   */
  readonly roleName: string;
  /**
   * The name of the Lambda function which deals with first commit via AWS CodeCommit.
   */
  readonly functionName: string;
  /**
   * The representative of Lambda function which deals with first commit via AWS CodeCommit.
   */
  readonly function: lambda.IFunction;
  constructor(scope: cdk.Construct, name: string, props: FirstCommitHandlerProps) {
    super(scope, name);
    this.roleName = props.roleName ?? 'LambdaForInitialCommitRole';
    this.functionName = props.functionName ?? 'FirstCommitHandler';
    const lambdaRole = new iam.Role(this, 'FirstCommitFunctionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'An execution role for the Lambda function which deals with first commit via AWS CodeCommit.',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'),
      ],
      roleName: this.roleName,
      inlinePolicies: {
        LambdaForBranchPolicy: new iam.PolicyDocument({
          assignSids: true,
          statements: [new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['codecommit:CreateCommit'],
            resources: [props.codeCommitRepoArn],
          })],
        }),
      },
    });

    const commitHandlerFunction = new lambda.Function(this, 'CommitHandlerFunction', {
      functionName: this.functionName,
      description: 'Read from latest commit and publish AWS Glue DataBrew recipe to production account',
      logRetention: logs.RetentionDays.THREE_MONTHS,
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromInline('import os\r\nimport json\r\nimport boto3\r\nimport cfnresponse\r\n\r\ndef lambda_handler(event, context):\r\n    if(event[\'RequestType\'] == \'Create\'):\r\n        code_commit_client = boto3.client(\'codecommit\')\r\n        code_commit_client.create_commit(repositoryName=os.environ[\'repo_name\'],branchName=os.environ[\'branch_name\'],commitMessage=\'Initial Commit\',putFiles=[{\'filePath\': \'README.md\',\'fileMode\': \'NORMAL\',\'fileContent\': os.environ[\'readme_contents\']}])\r\n    responseValue = 120\r\n    responseData = {}\r\n    responseData[\'Data\'] = responseValue\r\n    cfnresponse.send(event, context, cfnresponse.SUCCESS, responseData)'),
      handler: 'index.lambda_handler',
      memorySize: 128,
      role: lambdaRole,
      environment: {
        repo_name: props.repoName,
        branch_name: props.branchName,
        readme_contents: 'CONTENTS OF THIS FILE\r\n------------\r\n * Introduction\r\n * How to set up local access\r\nINTRODUCTION\r\n------------\r\nThis repository is used for storing recipes for AWSGlue DataBrew. DataBrew is a visual data preparation tool that makes it easy to profile and prepare data for analytics and machine learning (ML). \r\nHOW TO SET UP LOCAL ACCESS\r\n------------\r\nTo set up local developer access:\r\n1. Open a terminal window, and configure the AWS CLI.\r\n   ```\r\n   aws configure\r\n   ```\r\n2. When prompted, provide the following information.\r\n   ```\r\n   > AWS Access Key ID [None]: User-Access-Key\r\n   > AWS Secret Access Key ID [None]: User-Secret-Access-Key\r\n   > Default region name ID [None]: us-east-1\r\n   > Default output format [None]: json\r\n   ```\r\n3. In a plain-text editor, open the config file, also known as the AWS CLI configuration file. Depending on your operating system, this file might be located at `~/.aws/config` on Linux, macOS, or Unix, or at `drive:\\Users\\USERNAME\\.aws\\config` on Windows.\r\n4. Update the file to include two entries, default for your account, and a second for cross account access. The resulting file should look as follows: \r\n   ```\r\n   [default]\r\n   account = <user-account-id>\r\n   region = us-east-1\r\n   output = json\r\n    \r\n   [profile CrossAccountAccessProfile]\r\n   account = <infra-account-id>\r\n   region = us-east-1\r\n   output = json\r\n   role_arn = arn:aws:iam::<infra-account-id>:role/CrossAccountRepositoryContributorRole\r\n   source_profile = default\r\n   ```\r\n6. Save your changes, and close the plain-text editor.\r\n7. Run *git clone* to clone the shared repository.\r\n   ```\r\n   > git clone codecommit://CrossAccountAccessProfile@DataBrew-Recipes-Repo \r\n   ```',
      },
      timeout: cdk.Duration.seconds(20),
      tracing: lambda.Tracing.ACTIVE,
    });
    this.function = commitHandlerFunction;
  }
}