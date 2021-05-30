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
    bucketName: 'bucket-name'
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toMatchSnapshot();
  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::IAM::Role', 9);
  expect(infraStack).toHaveResource('AWS::IAM::Role', {
    "AssumeRolePolicyDocument": {
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Effect": "Allow",
          "Principal": {
            "Service": "codepipeline.amazonaws.com "
          }
        }
      ],
      "Version": "2012-10-17"
    },
    "Description": "The IAM role for the CodePipeline CICD pipeline in the infrastructure account.",
    "RoleName": "DataBrew-Recipe-Pipeline-Role"
  });
  expect(infraStack).toHaveResource('AWS::IAM::Role', {
    "AssumeRolePolicyDocument": {
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Effect": "Allow",
          "Principal": {
            "Service": "events.amazonaws.com"
          }
        }
      ],
      "Version": "2012-10-17"
    }
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::IAM::Policy', 8);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    "PolicyDocument": {
      "Statement": [
        {
          "Action": "lambda:ListFunctions",
          "Effect": "Allow",
          "Resource": "*"
        },
        {
          "Action": "lambda:InvokeFunction",
          "Effect": "Allow",
          "Resource": {
            "Fn::GetAtt": [
              "DataBrewCicdPipelineProductionLambdaProductionFunctionB7DE098C",
              "Arn"
            ]
          }
        }
      ],
      "Version": "2012-10-17"
    },
    "PolicyName": "DataBrewCicdPipelineProdDeployRecipeCodePipelineActionRoleDefaultPolicyDD08D6A4",
    "Roles": [
      {
        "Ref": "DataBrewCicdPipelineProdDeployRecipeCodePipelineActionRole555B7C85"
      }
    ]
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    "PolicyDocument": {
      "Statement": [
        {
          "Action": "lambda:ListFunctions",
          "Effect": "Allow",
          "Resource": "*"
        },
        {
          "Action": "lambda:InvokeFunction",
          "Effect": "Allow",
          "Resource": {
            "Fn::GetAtt": [
              "DataBrewCicdPipelinePreProductionLambdaPreProductionFunction28B8FA05",
              "Arn"
            ]
          }
        }
      ],
      "Version": "2012-10-17"
    },
    "PolicyName": "DataBrewCicdPipelinePreProdDeployRecipeCodePipelineActionRoleDefaultPolicy2ED2ED0C",
    "Roles": [
      {
        "Ref": "DataBrewCicdPipelinePreProdDeployRecipeCodePipelineActionRole53F08A63"
      }
    ]
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    "PolicyDocument": {
      "Statement": [
        {
          "Action": "codepipeline:StartPipelineExecution",
          "Effect": "Allow",
          "Resource": {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":codepipeline:",
                {
                  "Ref": "AWS::Region"
                },
                ":",
                {
                  "Ref": "AWS::AccountId"
                },
                ":",
                {
                  "Ref": "DataBrewCicdPipelineCC806CF6"
                }
              ]
            ]
          }
        }
      ],
      "Version": "2012-10-17"
    },
    "PolicyName": "DataBrewCicdPipelineEventsRoleDefaultPolicy8CB5BEFB",
    "Roles": [
      {
        "Ref": "DataBrewCicdPipelineEventsRole934BD973"
      }
    ]
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    "PolicyDocument": {
      "Statement": [
        {
          "Action": [
            "s3:GetObject*",
            "s3:GetBucket*",
            "s3:List*",
            "s3:DeleteObject*",
            "s3:PutObject*",
            "s3:Abort*"
          ],
          "Effect": "Allow",
          "Resource": [
            {
              "Fn::GetAtt": [
                "DataBrewCicdPipelineCodePipelineBucket8E660891",
                "Arn"
              ]
            },
            {
              "Fn::Join": [
                "",
                [
                  {
                    "Fn::GetAtt": [
                      "DataBrewCicdPipelineCodePipelineBucket8E660891",
                      "Arn"
                    ]
                  },
                  "/*"
                ]
              ]
            }
          ]
        },
        {
          "Action": [
            "codecommit:GetBranch",
            "codecommit:GetCommit",
            "codecommit:UploadArchive",
            "codecommit:GetUploadArchiveStatus",
            "codecommit:CancelUploadArchive"
          ],
          "Effect": "Allow",
          "Resource": {
            "Fn::GetAtt": [
              "DataBrewCicdPipelineDataBrewRepository47B249AB",
              "Arn"
            ]
          }
        }
      ],
      "Version": "2012-10-17"
    },
    "PolicyName": "DataBrewCicdPipelineSourceCodePipelineActionRoleDefaultPolicy2B4AE9B4",
    "Roles": [
      {
        "Ref": "DataBrewCicdPipelineSourceCodePipelineActionRoleFEFC0B02"
      }
    ]
  });
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::IAM::Policy', {
    "PolicyDocument": {
      "Statement": [
        {
          "Action": [
            "codedeploy:CreateDeployment",
            "codedeploy:GetApplicationRevision",
            "codedeploy:GetDeployment",
            "codedeploy:GetDeploymentConfig",
            "codedeploy:RegisterApplicationRevision"
          ],
          "Effect": "Allow",
          "Resource": [
            {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  ":codedeploy:",
                  {
                    "Ref": "AWS::Region"
                  },
                  ":",
                  {
                    "Ref": "AWS::AccountId"
                  },
                  ":deploymentgroup:DataBrew-Recipe-Application*"
                ]
              ]
            },
            {
              "Fn::Join": [
                "",
                [
                  "arn:",
                  {
                    "Ref": "AWS::Partition"
                  },
                  ":codedeploy:",
                  {
                    "Ref": "AWS::Region"
                  },
                  ":",
                  {
                    "Ref": "AWS::AccountId"
                  },
                  ":application:DataBrew-Recipe-Application"
                ]
              ]
            }
          ],
          "Sid": "CodeDeployPermissions"
        },
        {
          "Action": [
            "codecommit:GetBranch",
            "codecommit:GetCommit",
            "codecommit:GetUploadArchiveStatus",
            "codecommit:UploadArchive"
          ],
          "Effect": "Allow",
          "Resource": {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":codecommit:",
                {
                  "Ref": "AWS::Region"
                },
                ":",
                {
                  "Ref": "AWS::AccountId"
                },
                ":DataBrew-Recipes-Repo"
              ]
            ]
          },
          "Sid": "CodeCommitPermissions"
        },
        {
          "Action": [
            "s3:GetObject",
            "s3:PutObject"
          ],
          "Effect": "Allow",
          "Resource": {
            "Fn::GetAtt": [
              "DataBrewCicdPipelineCodePipelineBucket8E660891",
              "Arn"
            ]
          },
          "Sid": "S3Permissions"
        },
        {
          "Action": "lambda:InvokeFunction",
          "Effect": "Allow",
          "Resource": [
            {
              "Fn::GetAtt": [
                "DataBrewCicdPipelinePreProductionLambdaPreProductionFunction28B8FA05",
                "Arn"
              ]
            },
            {
              "Fn::GetAtt": [
                "DataBrewCicdPipelineProductionLambdaProductionFunctionB7DE098C",
                "Arn"
              ]
            }
          ],
          "Sid": "LambdaPermissions"
        }
      ],
      "Version": "2012-10-17"
    },
    "PolicyName": "DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleDefaultPolicyCF285214",
    "Roles": [
      {
        "Ref": "DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511"
      }
    ]
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::CodeCommit::Repository', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::CodeCommit::Repository', {
    "RepositoryName": "DataBrew-Recipes-Repo",
    "RepositoryDescription": "Some description."
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::Events::Rule', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResource('AWS::Events::Rule', {
    "EventPattern": {
      "source": [
        "aws.codecommit"
      ],
      "resources": [
        {
          "Fn::GetAtt": [
            "DataBrewCicdPipelineDataBrewRepository47B249AB",
            "Arn"
          ]
        }
      ],
      "detail-type": [
        "CodeCommit Repository State Change"
      ],
      "detail": {
        "event": [
          "referenceCreated",
          "referenceUpdated"
        ],
        "referenceName": [
          "main"
        ]
      }
    },
    "State": "ENABLED",
    "Targets": [
      {
        "Arn": {
          "Fn::Join": [
            "",
            [
              "arn:",
              {
                "Ref": "AWS::Partition"
              },
              ":codepipeline:",
              {
                "Ref": "AWS::Region"
              },
              ":",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "DataBrewCicdPipelineCC806CF6"
              }
            ]
          ]
        },
        "Id": "Target0",
        "RoleArn": {
          "Fn::GetAtt": [
            "DataBrewCicdPipelineEventsRole934BD973",
            "Arn"
          ]
        }
      }
    ]
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::CodePipeline::Pipeline', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::CodePipeline::Pipeline', {
    "RoleArn": {
      "Fn::GetAtt": [
        "DataBrewCicdPipelineDataBrewCodePipelineRoleCodePipelineIamRoleE9975511",
        "Arn"
      ]
    },
    "Stages": [
      {
        "Actions": [
          {
            "ActionTypeId": {
              "Category": "Source",
              "Owner": "AWS",
              "Provider": "CodeCommit",
              "Version": "1"
            },
            "Configuration": {
              "RepositoryName": {
                "Fn::GetAtt": [
                  "DataBrewCicdPipelineDataBrewRepository47B249AB",
                  "Name"
                ]
              },
              "BranchName": "main",
              "PollForSourceChanges": false
            },
            "Name": "Source",
            "OutputArtifacts": [
              {
                "Name": "SourceOutput"
              }
            ],
            "RoleArn": {
              "Fn::GetAtt": [
                "DataBrewCicdPipelineSourceCodePipelineActionRoleFEFC0B02",
                "Arn"
              ]
            },
            "RunOrder": 1
          }
        ],
        "Name": "Source"
      },
      {
        "Actions": [
          {
            "ActionTypeId": {
              "Category": "Invoke",
              "Owner": "AWS",
              "Provider": "Lambda",
              "Version": "1"
            },
            "Configuration": {
              "FunctionName": {
                "Ref": "DataBrewCicdPipelinePreProductionLambdaPreProductionFunction28B8FA05"
              }
            },
            "Name": "PreProd-DeployRecipe",
            "RoleArn": {
              "Fn::GetAtt": [
                "DataBrewCicdPipelinePreProdDeployRecipeCodePipelineActionRole53F08A63",
                "Arn"
              ]
            },
            "RunOrder": 1
          }
        ],
        "Name": "PreProd-DeployRecipe"
      },
      {
        "Actions": [
          {
            "ActionTypeId": {
              "Category": "Invoke",
              "Owner": "AWS",
              "Provider": "Lambda",
              "Version": "1"
            },
            "Configuration": {
              "FunctionName": {
                "Ref": "DataBrewCicdPipelineProductionLambdaProductionFunctionB7DE098C"
              }
            },
            "Name": "Prod-DeployRecipe",
            "RoleArn": {
              "Fn::GetAtt": [
                "DataBrewCicdPipelineProdDeployRecipeCodePipelineActionRole555B7C85",
                "Arn"
              ]
            },
            "RunOrder": 1
          }
        ],
        "Name": "Prod-DeployRecipe"
      }
    ],
    "ArtifactStore": {
      "Location": {
        "Ref": "DataBrewCicdPipelineCodePipelineBucket8E660891"
      },
      "Type": "S3"
    },
    "Name": "DataBrew-Recipe-Application"
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::S3::Bucket', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::S3::Bucket', {
    "BucketName": "bucket-name"
  });

  expect(SynthUtils.toCloudFormation(infraStack)).toCountResources('AWS::S3::BucketPolicy', 1);
  expect(SynthUtils.toCloudFormation(infraStack)).toHaveResourceLike('AWS::S3::BucketPolicy', {
    "Bucket": {
      "Ref": "DataBrewCicdPipelineCodePipelineBucket8E660891"
    },
    "PolicyDocument": {
      "Statement": [
        {
          "Action": [
            "s3:GetObject*",
            "s3:GetBucket*",
            "s3:List*",
            "s3:DeleteObject*"
          ],
          "Effect": "Allow",
          "Principal": {
            "AWS": {
              "Fn::GetAtt": [
                "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
                "Arn"
              ]
            }
          },
          "Resource": [
            {
              "Fn::GetAtt": [
                "DataBrewCicdPipelineCodePipelineBucket8E660891",
                "Arn"
              ]
            },
            {
              "Fn::Join": [
                "",
                [
                  {
                    "Fn::GetAtt": [
                      "DataBrewCicdPipelineCodePipelineBucket8E660891",
                      "Arn"
                    ]
                  },
                  "/*"
                ]
              ]
            }
          ]
        },
        {
          "Action": "s3:PutObject",
          "Condition": {
            "StringNotEquals": {
              "s3:x-amz-server-side-encryption": "aws:kms"
            }
          },
          "Effect": "Deny",
          "Principal": "*",
          "Resource": {
            "Fn::Join": [
              "",
              [
                {
                  "Fn::GetAtt": [
                    "DataBrewCicdPipelineCodePipelineBucket8E660891",
                    "Arn"
                  ]
                },
                "/*"
              ]
            ]
          },
          "Sid": "DenyUnEncryptedObjectUploads"
        }
      ],
      "Version": "2012-10-17"
    }
  });
})