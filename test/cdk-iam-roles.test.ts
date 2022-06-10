import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IamRole } from '../src/cdk-iam-roles';

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

  const template = Template.fromStack(stack);


  template.resourceCountIs('AWS::IAM::Role', 2);
  template.hasResourceProperties('AWS::IAM::Role', {
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
  template.hasResourceProperties('AWS::IAM::Role', {
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