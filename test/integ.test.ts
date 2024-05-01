import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DataBrewCodePipeline } from '../src/cdk-databrew-cicd';

test('IamRole', () => {
  const app = new cdk.App();
  const infraStack = new cdk.Stack(app, 'infra-stack');

  new DataBrewCodePipeline(infraStack, 'DataBrewCicdPipeline', {
    preproductionIamRoleArn: 'PREPRODUCTION_IAM_ROLE_ARN',
    productionIamRoleArn: 'PRODUCTION_IAM_ROLE_ARN',
    bucketName: 'bucket-name',
  });
  const template = Template.fromStack(infraStack);

  template.resourceCountIs('AWS::IAM::ManagedPolicy', 2);

  template.resourceCountIs('AWS::IAM::Policy', 7);

  template.resourceCountIs('AWS::CodeCommit::Repository', 1);
  template.hasResourceProperties('AWS::CodeCommit::Repository', {
    RepositoryName: 'DataBrew-Recipes-Repo',
  });
  template.resourceCountIs('Custom::LambdaInvoker', 1);
  template.hasResourceProperties('Custom::LambdaInvoker', {
    ServiceToken: {
      'Fn::GetAtt': [
        'DataBrewCicdPipelineLambdaInvokerframeworkonEvent3608D392',
        'Arn',
      ],
    },
  });

  template.resourceCountIs('AWS::Events::Rule', 1);
  template.hasResourceProperties('AWS::Events::Rule', {
    EventPattern: {
      'source': [
        'aws.codecommit',
      ],
      'resources': [
        {
          'Fn::GetAtt': [
            'DataBrewCicdPipelineDataBrewRepository47B249AB',
            'Arn',
          ],
        },
      ],
      'detail-type': [
        'CodeCommit Repository State Change',
      ],
      'detail': {
        event: [
          'referenceCreated',
          'referenceUpdated',
        ],
        referenceName: [
          'main',
        ],
      },
    },
    State: 'ENABLED',
    Targets: [
      {
        Arn: {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':codepipeline:',
              {
                Ref: 'AWS::Region',
              },
              ':',
              {
                Ref: 'AWS::AccountId',
              },
              ':',
              {
                Ref: 'DataBrewCicdPipelineCC806CF6',
              },
            ],
          ],
        },
        Id: 'Target0',
        RoleArn: {
          'Fn::GetAtt': [
            'DataBrewCicdPipelineEventsRole934BD973',
            'Arn',
          ],
        },
      },
    ],
  });

  template.resourceCountIs('AWS::CodePipeline::Pipeline', 1);
  template.hasResourceProperties('AWS::CodePipeline::Pipeline', Match.objectLike({
    ArtifactStore: {
      Location: {
        Ref: Match.stringLikeRegexp('DataBrewCicdPipelineCodePipelineBucket'),
      },
      Type: 'S3',
    },
    Name: 'DataBrew-Recipe-Application',
    RoleArn: {
      'Fn::GetAtt': [
        'DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511',
        'Arn',
      ],
    },
    Stages: [
      {
        Actions: [
          {
            ActionTypeId: {
              Category: 'Source',
              Owner: 'AWS',
              Provider: 'CodeCommit',
              Version: '1',
            },
            Configuration: {
              RepositoryName: {
                'Fn::GetAtt': [
                  'DataBrewCicdPipelineDataBrewRepository47B249AB',
                  'Name',
                ],
              },
              BranchName: 'main',
              PollForSourceChanges: false,
            },
            Name: 'Source',
            OutputArtifacts: [
              {
                Name: 'SourceOutput',
              },
            ],
            RoleArn: {
              'Fn::GetAtt': [
                'DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511',
                'Arn',
              ],
            },
            RunOrder: 1,
          },
        ],
        Name: 'Source',
      },
      {
        Actions: [
          {
            ActionTypeId: {
              Category: 'Invoke',
              Owner: 'AWS',
              Provider: 'Lambda',
              Version: '1',
            },
            Configuration: {
              FunctionName: {
                Ref: 'DataBrewCicdPipelinePreProductionLambdaPreProductionFunction28B8FA05',
              },
            },
            InputArtifacts: [
              {
                Name: 'SourceOutput',
              },
            ],
            Name: 'PreProd-DeployRecipe',
            RoleArn: {
              'Fn::GetAtt': [
                'DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511',
                'Arn',
              ],
            },
            RunOrder: 1,
          },
        ],
        Name: 'PreProd-DeployRecipe',
      },
      {
        Actions: [
          {
            ActionTypeId: {
              Category: 'Invoke',
              Owner: 'AWS',
              Provider: 'Lambda',
              Version: '1',
            },
            Configuration: {
              FunctionName: {
                Ref: 'DataBrewCicdPipelineProductionLambdaProductionFunctionB7DE098C',
              },
            },
            InputArtifacts: [
              {
                Name: 'SourceOutput',
              },
            ],
            Name: 'Prod-DeployRecipe',
            RoleArn: {
              'Fn::GetAtt': [
                'DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511',
                'Arn',
              ],
            },
            RunOrder: 1,
          },
        ],
        Name: 'Prod-DeployRecipe',
      },
    ],
  }));

  template.resourceCountIs('AWS::S3::Bucket', 1);
  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'bucket-name',
  });

  template.resourceCountIs('AWS::S3::BucketPolicy', 1);
  template.hasResourceProperties('AWS::S3::BucketPolicy', Match.objectLike({
    Bucket: {
      Ref: 'DataBrewCicdPipelineCodePipelineBucket8E660891',
    },
    PolicyDocument: {
      Statement: [
        {
          Action: [
            's3:PutBucketPolicy',
            's3:GetBucket*',
            's3:List*',
            's3:DeleteObject*',
          ],
          Effect: 'Allow',
          Principal: {
            AWS: {
              'Fn::GetAtt': [
                'CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092',
                'Arn',
              ],
            },
          },
          Resource: [
            {
              'Fn::GetAtt': [
                'DataBrewCicdPipelineCodePipelineBucket8E660891',
                'Arn',
              ],
            },
            {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [
                      'DataBrewCicdPipelineCodePipelineBucket8E660891',
                      'Arn',
                    ],
                  },
                  '/*',
                ],
              ],
            },
          ],
        },
        {
          Action: 's3:PutObject',
          Condition: {
            StringNotEquals: {
              's3:x-amz-server-side-encryption': 'aws:kms',
            },
          },
          Effect: 'Deny',
          Principal: {
            AWS: '*',
          },
          Resource: {
            'Fn::Join': [
              '',
              [
                {
                  'Fn::GetAtt': [
                    'DataBrewCicdPipelineCodePipelineBucket8E660891',
                    'Arn',
                  ],
                },
                '/*',
              ],
            ],
          },
          Sid: 'DenyUnEncryptedObjectUploads',
        },
      ],
      Version: '2012-10-17',
    },
  }));
});
