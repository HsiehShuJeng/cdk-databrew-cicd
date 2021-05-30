import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as logs from '@aws-cdk/aws-logs';
import * as path from 'path';

export interface PreProductionLambdaProps {
    /**
     * The ARN of the S3 bucket for the DataBrew CICD pipeline.
     */
    bucketArn: string;
    /**
     * The ARN of the IAM role in the pre-production account.
     */
    preproductionIamRoleArn: string;
    /**
     * The name of the IAM role for the pre-produciton Lambda function.
     * 
     * @default 'PreProd-DataBrew-Recipe-Deployer-role'
     */
    roleName?: string;
    /**
     * The Lambda funciton name for the pre-production account.
     * 
     * @default 'PreProd-DataBrew-Recipe-Deployer'
     */
    functionName?: string;
}

export class PreProductionLambda extends cdk.Construct {
    /**
     * The name of the IAM role for the pre-produciton Lambda function.
     */
    readonly roleName: string;
    /**
     * The Lambda funciton name for the pre-production account.
     */
    readonly functionName: string;
    /**
     * The representative of Lambda function for the pre-production account.
     */
    readonly function: lambda.IFunction;
    constructor(scope: cdk.Construct, name: string, props: PreProductionLambdaProps) {
        super(scope, name);
        this.roleName = props.roleName ?? 'PreProd-DataBrew-Recipe-Deployer-role';
        this.functionName = props.functionName ?? 'PreProd-DataBrew-Recipe-Deployer'

        const lambdaRole = new iam.Role(this, 'PreproductionFunctionRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com '),
            description: 'An execution role for the pre-production Lambda funciton.',
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess')],
            roleName: this.roleName
        });

        lambdaRole.addToPolicy(new iam.PolicyStatement({
            sid: 'CodePipelinePermissions',
            effect: iam.Effect.ALLOW,
            actions: [
                'codepipeline:PutJobFailureResult',
                'codepipeline:PutJobSuccessResult'
            ],
            resources: ['*']
        }));
        lambdaRole.addToPolicy(new iam.PolicyStatement({
            sid: 'S3BucketPermissions',
            effect: iam.Effect.ALLOW,
            actions: ['s3:GetObject'],
            resources: [`${props.bucketArn}/*`]
        }));
        lambdaRole.addToPolicy(new iam.PolicyStatement({
            sid: 'AssumeRolePermission',
            effect: iam.Effect.ALLOW,
            actions: ['sts:AssumeRole'],
            resources: [props.preproductionIamRoleArn]
        }));

        const preproductionFunction = new lambda.Function(this, 'PreProductionFunction', {
            functionName: this.functionName,
            description: 'Read from latest commit and publish AWS Glue DataBrew recipe to pre-prod account',
            logRetention: logs.RetentionDays.THREE_MONTHS,
            runtime: lambda.Runtime.PYTHON_3_8,
            code: lambda.Code.fromAsset(path.join(__dirname, 'resources/preproduction')),
            handler: 'index.lambda_handler',
            memorySize: 128,
            role: lambdaRole,
            timeout: cdk.Duration.seconds(20),
            tracing: lambda.Tracing.ACTIVE
        });
        this.function = preproductionFunction;
    }
}


export interface ProductionLambdaProps {
    /**
     * The ARN of the S3 bucket for the DataBrew CICD pipeline.
     */
    bucketArn: string;
    /**
     * The ARN of the IAM role in the production account.
     */
    productionIamRoleArn: string;
    /**
     * The name of the IAM role for the produciton Lambda function.
     * 
     * @default 'Prod-DataBrew-Recipe-Deployer-role'
     */
    roleName?: string;
    /**
     * The Lambda funciton name for the production account.
     * 
     * @default 'Prod-DataBrew-Recipe-Deployer'
     */
    functionName?: string;
}


export class ProductionLambda extends cdk.Construct {
    /**
     * The name of the IAM role for the produciton Lambda function.
     */
    readonly roleName: string;
    /**
     * The Lambda funciton name for the production account.
     */
    readonly functionName: string;
    /**
     * The representative of Lambda function for the production account.
     */
    readonly function: lambda.IFunction;
    constructor(scope: cdk.Construct, name: string, props: ProductionLambdaProps) {
        super(scope, name);
        this.roleName = props.roleName ?? 'Prod-DataBrew-Recipe-Deployer-role';
        this.functionName = props.functionName ?? 'Prod-DataBrew-Recipe-Deployer'

        const lambdaRole = new iam.Role(this, 'ProductionFunctionRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com '),
            description: 'An execution role for the production Lambda funciton.',
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess')],
            roleName: this.roleName
        });

        lambdaRole.addToPolicy(new iam.PolicyStatement({
            sid: 'CodePipelinePermissions',
            effect: iam.Effect.ALLOW,
            actions: [
                'codepipeline:PutJobFailureResult',
                'codepipeline:PutJobSuccessResult'
            ],
            resources: ['*']
        }));
        lambdaRole.addToPolicy(new iam.PolicyStatement({
            sid: 'S3BucketPermissions',
            effect: iam.Effect.ALLOW,
            actions: ['s3:GetObject'],
            resources: [`${props.bucketArn}/*`]
        }));
        lambdaRole.addToPolicy(new iam.PolicyStatement({
            sid: 'AssumeRolePermission',
            effect: iam.Effect.ALLOW,
            actions: ['sts:AssumeRole'],
            resources: [props.productionIamRoleArn]
        }));

        const productionFunction = new lambda.Function(this, 'ProductionFunction', {
            functionName: this.functionName,
            description: 'Read from latest commit and publish AWS Glue DataBrew recipe to production account',
            logRetention: logs.RetentionDays.THREE_MONTHS,
            runtime: lambda.Runtime.PYTHON_3_8,
            code: lambda.Code.fromAsset(path.join(__dirname, 'resources/production')),
            handler: 'index.lambda_handler',
            memorySize: 128,
            role: lambdaRole,
            timeout: cdk.Duration.seconds(20),
            tracing: lambda.Tracing.ACTIVE
        });
        this.function = productionFunction;
    }
}