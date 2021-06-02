using Amazon.CDK;
using ScottHsieh.Cdk;

namespace Csharp
{
    public class CsharpStack : Stack
    {
        internal CsharpStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            var preproductionAccountId = "PREPRODUCTION_ACCOUNT_ID";
            var productionAccountId = "PRODUCTION_ACCOUNT_ID";

            var dataBrewPipeline = new DataBrewCodePipeline(this, "DataBrewCicdPipeline", new DataBrewCodePipelineProps
            {
                PreproductionIamRoleArn = $"arn:{Aws.PARTITION}:iam::{preproductionAccountId}:role/preproduction-Databrew-Cicd-Role",
                ProductionIamRoleArn = $"arn:{Aws.PARTITION}:iam::{productionAccountId}:role/preproduction-Databrew-Cicd-Role",
                // BucketName = "OPTIONAL",
                // RepoName = "OPTIONAL",
                // BranchName = "OPTIONAL",
                // PipelineName = "OPTIONAL"
            });
            new CfnOutput(this, "OPreproductionLambdaArn", new CfnOutputProps
            {
                Value = dataBrewPipeline.PreproductionFunctionArn
            });
            new CfnOutput(this, "OProductionLambdaArn", new CfnOutputProps
            {
                Value = dataBrewPipeline.ProductionFunctionArn
            });
            new CfnOutput(this, "OCodeCommitRepoArn", new CfnOutputProps
            {
                Value = dataBrewPipeline.CodeCommitRepoArn
            });
            new CfnOutput(this, "OCodePipelineArn", new CfnOutputProps
            {
                Value = dataBrewPipeline.CodeCommitRepoArn
            });
        }
    }
}
