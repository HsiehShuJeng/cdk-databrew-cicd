import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { PreProductionLambda, ProductionLambda } from '../src/cdk-databrew-lambda';
import '@aws-cdk/assert/jest';

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

  expect(SynthUtils.toCloudFormation(lambdaStack)).toCountResources('AWS::IAM::ManagedPolicy', 2);
  expect(lambdaStack).toHaveResource('AWS::IAM::ManagedPolicy', {
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
  expect(lambdaStack).toHaveResource('AWS::IAM::ManagedPolicy', {
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

  expect(SynthUtils.toCloudFormation(lambdaStack)).toCountResources('AWS::IAM::Policy', 3);
  expect(lambdaStack).toHaveResourceLike('AWS::IAM::Policy', {
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

  expect(SynthUtils.toCloudFormation(lambdaStack)).toCountResources('AWS::IAM::Role', 3);
  expect(lambdaStack).toHaveResourceLike('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'lambda.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
    ManagedPolicyArns: [
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
          ],
        ],
      },
    ],
  });
  expect(lambdaStack).toHaveResourceLike('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'lambda.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
    ManagedPolicyArns: [
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
          ],
        ],
      },
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':iam::aws:policy/AWSXRayDaemonWriteAccess',
          ],
        ],
      },
    ],
    RoleName: 'PreProd-DataBrew-Recipe-Deployer-role',
  });
  expect(lambdaStack).toHaveResourceLike('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'lambda.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
    ManagedPolicyArns: [
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
          ],
        ],
      },
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':iam::aws:policy/AWSXRayDaemonWriteAccess',
          ],
        ],
      },
    ],
    RoleName: 'Prod-DataBrew-Recipe-Deployer-role',
  });

  expect(SynthUtils.toCloudFormation(lambdaStack)).toCountResources('AWS::Lambda::Function', 3);
  expect(lambdaStack).toHaveResourceLike('AWS::Lambda::Function', {
    Role: {
      'Fn::GetAtt': [
        'PreProductionLambdaPreproductionFunctionRole725F0407',
        'Arn',
      ],
    },
    FunctionName: 'PreProd-DataBrew-Recipe-Deployer',
    Handler: 'index.lambda_handler',
    MemorySize: 128,
    Runtime: 'python3.8',
    Timeout: 20,
    TracingConfig: {
      Mode: 'Active',
    },
  });
  expect(lambdaStack).toHaveResourceLike('AWS::Lambda::Function', {
    Role: {
      'Fn::GetAtt': [
        'ProductionLambdaProductionFunctionRoleC7B3DEF1',
        'Arn',
      ],
    },
    Handler: 'index.lambda_handler',
    MemorySize: 128,
    Runtime: 'python3.8',
    Timeout: 20,
    TracingConfig: {
      Mode: 'Active',
    },
  });
  expect(lambdaStack).toHaveResourceLike('AWS::Lambda::Function', {
    Handler: 'index.handler',
    Runtime: 'nodejs12.x',
    Role: {
      'Fn::GetAtt': [
        'LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8aServiceRole9741ECFB',
        'Arn',
      ],
    },
  });
});