import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { IamRole } from '../src/cdk-iam-roles';
import '@aws-cdk/assert/jest';

test('IAM role test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'aws-cdk-iam-role');

  new IamRole(stack, 'FirstAccountRole', {
    environment: 'preproduction',
    accountID: '123456789',
  });
  new IamRole(stack, 'SecondAccountRole', {
    environment: 'production',
    accountID: '987654321',
  });


  expect(SynthUtils.toCloudFormation(stack)).toCountResources('AWS::IAM::Role', 2);
  expect(stack).toHaveResourceLike('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            AWS: {
              'Fn::Join': [
                '',
                [
                  'arn:',
                  {
                    Ref: 'AWS::Partition',
                  },
                  ':iam::123456789:root',
                ],
              ],
            },
          },
        },
      ],
      Version: '2012-10-17',
    },
  });
  expect(stack).toHaveResourceLike('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            AWS: {
              'Fn::Join': [
                '',
                [
                  'arn:',
                  {
                    Ref: 'AWS::Partition',
                  },
                  ':iam::987654321:root',
                ],
              ],
            },
          },
        },
      ],
      Version: '2012-10-17',
    },
  });
});