#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { DataBrewCodePipeline } from '../../cdk-databrew-cicd';

class TypescriptStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const preproductionAccountId = '795886447637';
    const productionAccountId = '205419761841';

    const dataBrewPipeline = new DataBrewCodePipeline(this, 'DataBrewCicdPipeline', {
      preproductionIamRoleArn: `arn:${cdk.Aws.PARTITION}:iam::${preproductionAccountId}:role/preproduction-Databrew-Cicd-Role`,
      productionIamRoleArn: `arn:${cdk.Aws.PARTITION}:iam::${productionAccountId}:role/production-Databrew-Cicd-Role`,
      // bucketName: 'OPTIONAL',
      // repoName: 'OPTIONAL',
      // branchName: 'OPTIONAL',
      // pipelineName: 'OPTIONAL'
    });

    new cdk.CfnOutput(this, 'OPreproductionLambdaArn', { value: dataBrewPipeline.preproductionFunctionArn });
    new cdk.CfnOutput(this, 'OProductionLambdaArn', { value: dataBrewPipeline.productionFunctionArn });
    new cdk.CfnOutput(this, 'OCodeCommitRepoArn', { value: dataBrewPipeline.codeCommitRepoArn });
    new cdk.CfnOutput(this, 'OCodePipelineArn', { value: dataBrewPipeline.codePipelineArn });
  }
}

const app = new cdk.App();
new TypescriptStack(app, 'TypescriptStack', {
  stackName: 'DataBrew-CICD',
  /* If you don't specify 'env', this stack will be environment-agnostic.
           * Account/Region-dependent features and context lookups will not work,
           * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
           * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
           * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});