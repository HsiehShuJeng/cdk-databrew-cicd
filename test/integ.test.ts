import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import { CodePipelineIamRole } from '../src/cdk-databrew-cicd';

test('IamRole', () => {
  const app = new cdk.App();
  const infraStack = new cdk.Stack(app, 'infra-stack');


  new CodePipelineIamRole(infraStack, 'DataBrewCodePipeline', {
    bucketArn: 'bucketArn',
    preproductionLambdaArn: 'preproductionArn',
    productionLambdaArn: 'productionArn',
  });


  expect(SynthUtils.toCloudFormation(infraStack)).toMatchSnapshot();
  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::IAM::Role', 1);
  expect(infraStack).toHaveResourceLike('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'codepipeline.amazonaws.com ',
          },
        },
      ],
      Version: '2012-10-17',
    },
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::IAM::Policy', 1);
  expect(infraStack).toHaveResourceLike('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'codedeploy:CreateDeployment',
            'codedeploy:GetApplicationRevision',
            'codedeploy:GetDeployment',
            'codedeploy:GetDeploymentConfig',
            'codedeploy:RegisterApplicationRevision',
          ],
          Effect: 'Allow',
          Resource: [
            {
              'Fn::Join': [
                '',
                [
                  'arn:',
                  {
                    Ref: 'AWS::Partition',
                  },
                  ':codedeploy:',
                  {
                    Ref: 'AWS::Region',
                  },
                  ':',
                  {
                    Ref: 'AWS::AccountId',
                  },
                  ':deploymentgroup:DataBrew-Recipe-Application*',
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
                  ':codedeploy:',
                  {
                    Ref: 'AWS::Region',
                  },
                  ':',
                  {
                    Ref: 'AWS::AccountId',
                  },
                  ':application:DataBrew-Recipe-Application',
                ],
              ],
            },
          ],
          Sid: 'CodeDeployPermissions',
        },
        {
          Action: [
            'codecommit:GetBranch',
            'codecommit:GetCommit',
            'codecommit:GetUploadArchiveStatus',
            'codecommit:UploadArchive',
          ],
          Effect: 'Allow',
          Resource: {
            'Fn::Join': [
              '',
              [
                'arn:',
                {
                  Ref: 'AWS::Partition',
                },
                ':codecommit:',
                {
                  Ref: 'AWS::Region',
                },
                ':',
                {
                  Ref: 'AWS::AccountId',
                },
                ':DataBrew-Recipes-Repo',
              ],
            ],
          },
          Sid: 'CodeCommitPermissions',
        },
        {
          Action: [
            's3:GetObject',
            's3:PutObject',
          ],
          Effect: 'Allow',
          Resource: 'bucketArn',
          Sid: 'S3Permissions',
        },
        {
          Action: 'lambda:InvokeFunction',
          Effect: 'Allow',
          Resource: [
            'preproductionArn',
            'productionArn',
          ],
          Sid: 'LambdaPermissions',
        },
      ],
      Version: '2012-10-17',
    },
    PolicyName: 'DataBrewCodePipelineCodePipelineIamRoleDefaultPolicyB989C8CA',
    Roles: [
      {
        Ref: 'DataBrewCodePipelineCodePipelineIamRole2999CE31',
      },
    ],
  });
});