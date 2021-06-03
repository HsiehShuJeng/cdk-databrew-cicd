from aws_cdk import core as cdk
from cdk_databrew_cicd import DataBrewCodePipeline


class PythonStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        preproduction_account_id = "PREPRODUCTION_ACCOUNT_ID"
        production_account_id = "PRODUCTION_ACCOUNT_ID"

        databrew_pipeline = DataBrewCodePipeline(self,
        "DataBrewCicdPipeline",
        preproduction_iam_role_arn=f"arn:{cdk.Aws.PARTITION}:iam::{preproduction_account_id}:role/preproduction-Databrew-Cicd-Role",
        production_iam_role_arn=f"arn:{cdk.Aws.PARTITION}:iam::{production_account_id}:role/preproduction-Databrew-Cicd-Role",
            # bucket_name="OPTIONAL",
            # repo_name="OPTIONAL",
            # repo_name="OPTIONAL",
            # branch_namne="OPTIONAL",
            # pipeline_name="OPTIONAL"
            )

        cdk.CfnOutput(self, 'OPreproductionLambdaArn', value=databrew_pipeline.preproduction_function_arn)
        cdk.CfnOutput(self, 'OProductionLambdaArn', value=databrew_pipeline.production_function_arn)
        cdk.CfnOutput(self, 'OCodeCommitRepoArn', value=databrew_pipeline.code_commit_repo_arn)
        cdk.CfnOutput(self, 'OCodePipelineArn', value=databrew_pipeline.code_pipeline_arn)
