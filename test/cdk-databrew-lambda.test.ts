import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PreProductionLambda, ProductionLambda } from '../src/cdk-databrew-lambda';

test('Lambda test', () => {
  const app = new cdk.App();
  const lambdaStack = new cdk.Stack(app, 'aws-cdk-lambda');

  new PreProductionLambda(lambdaStack, 'PreProductionLambda', {
    bucketArn: 'BUCKET_ARN',
    preproductionIamRoleArn: 'PREPRODUCTION_IAM_ROLE_ARN',
  });

  new ProductionLambda(lambdaStack, 'ProductionLambda', {
    bucketArn: 'BUCKET_ARN',
    productionIamRoleArn: 'PRODUCTION_IAM_ROLE_ARN',
  });
  const template = Template.fromStack(lambdaStack);

  template.resourceCountIs('AWS::IAM::ManagedPolicy', 2);
  template.hasResourceProperties('AWS::IAM::ManagedPolicy', {
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'codepipeline:PutJobFailureResult',
            'codepipeline:PutJobSuccessResult',
          ],
          Effect: 'Allow',
          Resource: '*',
          Sid: 'CodePipelinePermissions',
        },
        {
          Action: 's3:GetObject',
          Effect: 'Allow',
          Resource: 'BUCKET_ARN/*',
          Sid: 'S3BucketPermissions',
        },
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Resource: 'PREPRODUCTION_IAM_ROLE_ARN',
          Sid: 'AssumeRolePermission',
        },
      ],
      Version: '2012-10-17',
    },
    Description: '',
    ManagedPolicyName: 'PreProd-DataBrew-Recipe-Deployer-Policy',
    Path: '/',
  });
  template.hasResourceProperties('AWS::IAM::ManagedPolicy', {
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'codepipeline:PutJobFailureResult',
            'codepipeline:PutJobSuccessResult',
          ],
          Effect: 'Allow',
          Resource: '*',
          Sid: 'CodePipelinePermissions',
        },
        {
          Action: 's3:GetObject',
          Effect: 'Allow',
          Resource: 'BUCKET_ARN/*',
          Sid: 'S3BucketPermissions',
        },
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Resource: 'PRODUCTION_IAM_ROLE_ARN',
          Sid: 'AssumeRolePermission',
        },
      ],
      Version: '2012-10-17',
    },
    Description: '',
    ManagedPolicyName: 'Prod-DataBrew-Recipe-Deployer-Policy',
    Path: '/',
  });

  template.resourceCountIs('AWS::IAM::Policy', 3);
  template.hasResourceProperties('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'logs:PutRetentionPolicy',
            'logs:DeleteRetentionPolicy',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
    PolicyName: 'LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRoleDefaultPolicyADDA7DEB',
    Roles: [
      {
        Ref: 'LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRole9741ECFB',
      },
    ],
  });

  template.resourceCountIs('AWS::IAM::Role', 3);

  template.resourceCountIs('AWS::Lambda::Function', 3);
  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: 'PreProd-DataBrew-Recipe-Deployer',
    Role: {
      'Fn::GetAtt': [
        'PreProductionLambdaPreproductionFunctionRole725F0407',
        'Arn',
      ],
    },
    Description: 'Read from latest commit and publish AWS Glue DataBrew recipe to pre-prod account',
    Environment: {
      Variables: {
        role: 'PREPRODUCTION_IAM_ROLE_ARN',
      },
    },
    Handler: 'index.lambda_handler',
    MemorySize: 128,
    Runtime: 'python3.8',
    Timeout: 20,
    TracingConfig: {
      Mode: 'Active',
    },
  });
});
