import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import { DataBrewCodePipeline } from '../src/cdk-databrew-cicd';

test('IamRole', () => {
  const app = new cdk.App();
  const infraStack = new cdk.Stack(app, 'infra-stack');

  new DataBrewCodePipeline(infraStack, 'DataBrewCicdPipeline', {
    preproductionIamRoleArn: 'PREPRODUCTION_IAM_ROLE_ARN',
    productionIamRoleArn: 'PRODUCTION_IAM_ROLE_ARN',
    bucketName: 'bucket-name',
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toMatchSnapshot();
  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::IAM::Role', 8);
  expect(infraStack).toHaveResourceLike('AWS::IAM::Role', {
    RoleName: 'DataBrew-Recipe-Pipeline-Role',
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: [
              'codepipeline.amazonaws.com',
              'lambda.amazonaws.com',
            ],
          },
        },
      ],
      Version: '2012-10-17',
    },
  });
  expect(infraStack).toHaveResource('AWS::IAM::Role', {
    RoleName: 'PreProd-DataBrew-Recipe-Deployer-role',
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
    Description: 'An execution role for the pre-production Lambda funciton.',
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
      {
        Ref: 'DataBrewCicdPipelinePreProductionLambdaPreProductionManagedPolicyF0F177F4',
      },
    ],
  });
  expect(infraStack).toHaveResource('AWS::IAM::Role', {
    RoleName: 'Prod-DataBrew-Recipe-Deployer-role',
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
    Description: 'An execution role for the production Lambda funciton.',
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
      {
        Ref: 'DataBrewCicdPipelineProductionLambdaProductionLambdaMangedPolicuyA84C256D',
      },
    ],
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::IAM::ManagedPolicy', 2);

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::IAM::Policy', 7);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    PolicyName: 'DataBrewCicdPipelinePreProductionLambdaPreproductionFunctionRoleDefaultPolicy26DF5E0A',
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'xray:PutTraceSegments',
            'xray:PutTelemetryRecords',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
        {
          Action: [
            'codepipeline:PutJobSuccessResult',
            'codepipeline:PutJobFailureResult',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
    Roles: [
      {
        Ref: 'DataBrewCicdPipelinePreProductionLambdaPreproductionFunctionRoleF4A39094',
      },
    ],
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    PolicyName: 'DataBrewCicdPipelineProductionLambdaProductionFunctionRoleDefaultPolicyE204515C',
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'xray:PutTraceSegments',
            'xray:PutTelemetryRecords',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
        {
          Action: [
            'codepipeline:PutJobSuccessResult',
            'codepipeline:PutJobFailureResult',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
    Roles: [
      {
        Ref: 'DataBrewCicdPipelineProductionLambdaProductionFunctionRoleEE3F9F49',
      },
    ],
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    PolicyName: 'DataBrewCicdPipelineFirstCommitLambdaFirstCommitFunctionRoleDefaultPolicyC4759469',
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'xray:PutTraceSegments',
            'xray:PutTelemetryRecords',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
    Roles: [
      {
        Ref: 'DataBrewCicdPipelineFirstCommitLambdaFirstCommitFunctionRoleDE9609F7',
      },
    ],
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: 'codepipeline:StartPipelineExecution',
          Effect: 'Allow',
          Resource: {
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
        },
      ],
      Version: '2012-10-17',
    },
    PolicyName: 'DataBrewCicdPipelineEventsRoleDefaultPolicy8CB5BEFB',
    Roles: [
      {
        Ref: 'DataBrewCicdPipelineEventsRole934BD973',
      },
    ],
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    PolicyName: 'DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleDefaultPolicyCF285214',
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
          Resource: {
            'Fn::GetAtt': [
              'DataBrewCicdPipelineCodePipelineBucket8E660891',
              'Arn',
            ],
          },
          Sid: 'S3Permissions',
        },
        {
          Action: 'lambda:InvokeFunction',
          Effect: 'Allow',
          Resource: [
            {
              'Fn::GetAtt': [
                'DataBrewCicdPipelinePreProductionLambdaPreProductionFunction28B8FA05',
                'Arn',
              ],
            },
            {
              'Fn::GetAtt': [
                'DataBrewCicdPipelineProductionLambdaProductionFunctionB7DE098C',
                'Arn',
              ],
            },
          ],
          Sid: 'LambdaPermissions',
        },
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Resource: {
            'Fn::GetAtt': [
              'DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511',
              'Arn',
            ],
          },
          Sid: 'AssumRolePermissions',
        },
        {
          Action: [
            's3:GetObject*',
            's3:GetBucket*',
            's3:List*',
            's3:DeleteObject*',
            's3:PutObject*',
            's3:Abort*',
          ],
          Effect: 'Allow',
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
          Action: [
            'codecommit:GetBranch',
            'codecommit:GetCommit',
            'codecommit:UploadArchive',
            'codecommit:GetUploadArchiveStatus',
            'codecommit:CancelUploadArchive',
          ],
          Effect: 'Allow',
          Resource: {
            'Fn::GetAtt': [
              'DataBrewCicdPipelineDataBrewRepository47B249AB',
              'Arn',
            ],
          },
        },
        {
          Action: 'lambda:ListFunctions',
          Effect: 'Allow',
          Resource: '*',
        },
        {
          Action: 'lambda:InvokeFunction',
          Effect: 'Allow',
          Resource: {
            'Fn::GetAtt': [
              'DataBrewCicdPipelinePreProductionLambdaPreProductionFunction28B8FA05',
              'Arn',
            ],
          },
        },
        {
          Action: [
            's3:GetObject*',
            's3:GetBucket*',
            's3:List*',
          ],
          Effect: 'Allow',
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
          Action: 'lambda:InvokeFunction',
          Effect: 'Allow',
          Resource: {
            'Fn::GetAtt': [
              'DataBrewCicdPipelineProductionLambdaProductionFunctionB7DE098C',
              'Arn',
            ],
          },
        },
      ],
      Version: '2012-10-17',
    },
    Roles: [
      {
        Ref: 'DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511',
      },
    ],
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::CodeCommit::Repository', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::CodeCommit::Repository', {
    RepositoryName: 'DataBrew-Recipes-Repo',
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('Custom::LambdaInvoker', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('Custom::LambdaInvoker', {
    ServiceToken: {
      'Fn::GetAtt': [
        'DataBrewCicdPipelineLambdaInvokerframeworkonEvent3608D392',
        'Arn',
      ],
    },
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::Events::Rule', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::Events::Rule', {
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

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::CodePipeline::Pipeline', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::CodePipeline::Pipeline', {
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
    ArtifactStore: {
      Location: {
        Ref: 'DataBrewCicdPipelineCodePipelineBucket8E660891',
      },
      Type: 'S3',
    },
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::S3::Bucket', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::S3::Bucket', {
    BucketName: 'bucket-name',
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::S3::BucketPolicy', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::S3::BucketPolicy', {
    'Bucket': {
      'Ref': 'DataBrewCicdPipelineCodePipelineBucket8E660891'
    },
    'PolicyDocument': {
      'Statement': [
        {
          'Action': [
            's3:GetBucket*',
            's3:List*',
            's3:DeleteObject*'
          ],
          'Effect': 'Allow',
          'Principal': {
            'AWS': {
              'Fn::GetAtt': [
                'CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092',
                'Arn'
              ]
            }
          },
          'Resource': [
            {
              'Fn::GetAtt': [
                'DataBrewCicdPipelineCodePipelineBucket8E660891',
                'Arn'
              ]
            },
            {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [
                      'DataBrewCicdPipelineCodePipelineBucket8E660891',
                      'Arn'
                    ]
                  },
                  '/*'
                ]
              ]
            }
          ]
        },
        {
          'Action': 's3:PutObject',
          'Condition': {
            'StringNotEquals': {
              's3:x-amz-server-side-encryption': 'aws:kms'
            }
          },
          'Effect': 'Deny',
          'Principal': '*',
          'Resource': {
            'Fn::Join': [
              '',
              [
                {
                  'Fn::GetAtt': [
                    'DataBrewCicdPipelineCodePipelineBucket8E660891',
                    'Arn'
                  ]
                },
                '/*'
              ]
            ]
          },
          'Sid': 'DenyUnEncryptedObjectUploads'
        }
      ],
      'Version': '2012-10-17'
    }
  });
});
