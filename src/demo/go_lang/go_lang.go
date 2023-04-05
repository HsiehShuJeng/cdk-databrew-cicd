package main

import (
	"fmt"

	"github.com/aws/aws-cdk-go/awscdk/v2"

	// "github.com/aws/aws-cdk-go/awscdk/v2/awssqs"
	"github.com/HsiehShuJeng/cdk-databrew-cicd-go/cdkdatabrewcicd/v2"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type GoLangStackProps struct {
	awscdk.StackProps
}

func NewGoLangStack(scope constructs.Construct, id string, props *GoLangStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	// The code that defines your stack goes here

	preproductionAccountId := "PREPRODUCTION_ACCOUNT_ID"
	productionAccountId := "PRODUCTION_ACCOUNT_ID"

	dataBrewPipeline := cdkdatabrewcicd.NewDataBrewCodePipeline(stack, jsii.String("DataBrewCicdPipeline"), &cdkdatabrewcicd.DataBrewCodePipelineProps{
		PreproductionIamRoleArn: jsii.String(fmt.Sprintf("arn:%s:iam::%s:role/preproduction-Databrew-Cicd-Role", *awscdk.Aws_PARTITION(), preproductionAccountId)),
		ProductionIamRoleArn:    jsii.String(fmt.Sprintf("arn:%s:iam::%s:role/production-Databrew-Cicd-Role", *awscdk.Aws_PARTITION(), productionAccountId)),
		// BucketName:   jsii.String("OPTIONAL"),
		// RepoName:     jsii.String("OPTIONAL"),
		// BranchName:   jsii.String("OPTIONAL"),
		// PipelineName: jsii.String("OPTIONAL"),
	})

	awscdk.NewCfnOutput(stack, jsii.String("OPreproductionLambdaArn"), &awscdk.CfnOutputProps{Value: dataBrewPipeline.PreproductionFunctionArn()})
	awscdk.NewCfnOutput(stack, jsii.String("OProductionLambdaArn"), &awscdk.CfnOutputProps{Value: dataBrewPipeline.ProductionFunctionArn()})
	awscdk.NewCfnOutput(stack, jsii.String("OCodeCommitRepoArn"), &awscdk.CfnOutputProps{Value: dataBrewPipeline.CodeCommitRepoArn()})
	awscdk.NewCfnOutput(stack, jsii.String("OCodePipelineArn"), &awscdk.CfnOutputProps{Value: dataBrewPipeline.CodePipelineArn()})

	return stack
}

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)

	NewGoLangStack(app, "GoLangStack", &GoLangStackProps{
		awscdk.StackProps{
			Env: env(),
		},
	})

	app.Synth(nil)
}

// env determines the AWS environment (account+region) in which our stack is to
// be deployed. For more information see: https://docs.aws.amazon.com/cdk/latest/guide/environments.html
func env() *awscdk.Environment {
	// If unspecified, this stack will be "environment-agnostic".
	// Account/Region-dependent features and context lookups will not work, but a
	// single synthesized template can be deployed anywhere.
	//---------------------------------------------------------------------------
	return nil

	// Uncomment if you know exactly what account and region you want to deploy
	// the stack to. This is the recommendation for production stacks.
	//---------------------------------------------------------------------------
	// return &awscdk.Environment{
	//  Account: jsii.String("123456789012"),
	//  Region:  jsii.String("us-east-1"),
	// }

	// Uncomment to specialize this stack for the AWS Account and Region that are
	// implied by the current CLI configuration. This is recommended for dev
	// stacks.
	//---------------------------------------------------------------------------
	// return &awscdk.Environment{
	//  Account: jsii.String(os.Getenv("CDK_DEFAULT_ACCOUNT")),
	//  Region:  jsii.String(os.Getenv("CDK_DEFAULT_REGION")),
	// }
}
