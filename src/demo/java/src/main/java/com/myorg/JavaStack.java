package com.myorg;

import software.amazon.awscdk.core.CfnOutput;
import software.amazon.awscdk.core.CfnOutputProps;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Stack;
import software.amazon.awscdk.core.StackProps;
import io.github.hsiehshujeng.cdk.databrew.cicd.DataBrewCodePipeline;
import io.github.hsiehshujeng.cdk.databrew.cicd.DataBrewCodePipelineProps;

public class JavaStack extends Stack {
    public JavaStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public JavaStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);
        String preproductionAccountId = "PREPRODUCTION_ACCOUNT_ID";
        String productionAccountId = "PRODUCTION_ACCOUNT_ID";
        DataBrewCodePipeline databrewPipeline = new DataBrewCodePipeline(this, "DataBrewCicdPipeline",
                DataBrewCodePipelineProps.builder().preproductionIamRoleArn(preproductionAccountId)
                        .productionIamRoleArn(productionAccountId)
                        // .bucketName("OPTIONAL")
                        // .branchName("OPTIONAL")
                        // .pipelineName("OPTIONAL")
                        .build());

        new CfnOutput(this, "OPreproductionLambdaArn",
                CfnOutputProps.builder().value(databrewPipeline.getPreproductionFunctionArn()).build());
        new CfnOutput(this, "OProductionLambdaArn",
                CfnOutputProps.builder().value(databrewPipeline.getProductionFunctionArn()).build());
        new CfnOutput(this, "OCodeCommitRepoArn",
                CfnOutputProps.builder().value(databrewPipeline.getCodeCommitRepoArn()).build());
        new CfnOutput(this, "OCodePipelineArn",
                CfnOutputProps.builder().value(databrewPipeline.getCodePipelineArn()).build());
    }
}
