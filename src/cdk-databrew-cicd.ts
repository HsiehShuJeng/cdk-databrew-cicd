import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';


export interface InfraIamRoleProps {
    /**
     * The role name for the infrastructure account.
     * 
     * @default 'CrossAccountRepositoryContributorRole'
     */
    roleName?: string;
}
export class InfraIamRole extends cdk.Construct {
    /**
     * The ARN of the IAM role for the infrastructure account.
     */
    readonly roleArn: string;
    constructor(scope: cdk.Construct, name: string, props: InfraIamRoleProps) {
        super(scope, name);

        const role = new iam.Role(this, 'InfraIamRole', {
            assumedBy: new iam.AccountRootPrincipal(),
            roleName: props.roleName ?? 'CrossAccountRepositoryContributorRole',
            description: `The IAM role for DataBrew CICD in the infrastructure account.`
        });
        role.addToPolicy(new iam.PolicyStatement({
            sid: 'CodeCommitPermissions',
            effect: iam.Effect.ALLOW,
            actions: [
                'codecommit:BatchGet*',
                'codecommit:Create*',
                'codecommit:DeleteBranch',
                'codecommit:Get*',
                'codecommit:List*',
                'codecommit:Describe*',
                'codecommit:Put*',
                'codecommit:Post*',
                'codecommit:Merge*',
                'codecommit:Test*',
                'codecommit:Update*',
                'codecommit:GitPull',
                'codecommit:GitPush'],
            resources: [
                `arn:${cdk.Aws.PARTITION}:codecommit:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:DataBrew-Recipes-Repo`]
        }));
        role.addToPolicy(new iam.PolicyStatement({
            sid: 'CodeCommitListReposPermission',
            effect: iam.Effect.ALLOW,
            actions: [
                'codecommit:ListRepositories'],
            resources: ['*']
        }));
        this.roleArn = role.roleArn;
    }
}

export interface CodePipelineIamRoleProps {
    /**
     * The ARN of the S3 bucket where you store your ???.
     */
    bucketArn: string;
    /**
     * The ARN of the Lambda function for the pre-production account.
     */
    preproductionLambdaArn: string;
    /**
     * The ARN of the Lambda function for the production account.
     */
     productionLambdaArn: string;
    /**
     * The role name for the CodePipeline CICD pipeline.
     * 
     * @default 'DataBrew-Recipe-Pipeline-Role'
     */
    roleName?: string;
}

export class CodePipelineIamRole extends cdk.Construct {
    /**
     * The ARN of the IAM role for the CodePipeline CICD pipeline.
     */
    readonly roleArn: string;
    constructor(scope: cdk.Construct, name: string, props: CodePipelineIamRoleProps) {
        super(scope, name);
        const role = new iam.Role(this, 'CodePipelineIamRole', {
            assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com '),
            roleName: props.roleName ?? 'DataBrew-Recipe-Pipeline-Role',
            description: `The IAM role for the CodePipeline CICD pipeline in the infrastructure account.`
        });
        // CodeDeploy permissions
        role.addToPolicy(new iam.PolicyStatement({
            sid: 'CodeDeployPermissions',
            effect: iam.Effect.ALLOW,
            actions: [
                'codedeploy:CreateDeployment',
                'codedeploy:GetApplicationRevision',
                'codedeploy:GetDeployment',
                'codedeploy:GetDeploymentConfig',
                'codedeploy:RegisterApplicationRevision'],
            resources: [
                `arn:${cdk.Aws.PARTITION}:codedeploy:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:deploymentgroup:DataBrew-Recipe-Application*`,
                `arn:${cdk.Aws.PARTITION}:codedeploy:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:application:DataBrew-Recipe-Application`]
        }));
        // CodeCommit permissions
        role.addToPolicy(new iam.PolicyStatement({
            sid: 'CodeCommitPermissions',
            effect: iam.Effect.ALLOW,
            actions: [
                'codecommit:GetBranch',
                'codecommit:GetCommit',
                'codecommit:GetUploadArchiveStatus',
                'codecommit:UploadArchive'],
            resources: [
                `arn:${cdk.Aws.PARTITION}:codecommit:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:DataBrew-Recipes-Repo`]
        }));
        // S3 permissions
        role.addToPolicy(new iam.PolicyStatement({
            sid: 'S3Permissions',
            effect: iam.Effect.ALLOW,
            actions: [
                's3:GetObject',
                's3:PutObject'],
            resources: [props.bucketArn]
        }));
        // Lambda permissions
        role.addToPolicy(new iam.PolicyStatement({
            sid: 'LambdaPermissions',
            effect: iam.Effect.ALLOW,
            actions: [
                'lambda:InvokeFunction'],
            resources: [props.preproductionLambdaArn, props.productionLambdaArn]
        }));
        this.roleArn = role.roleArn;
    }
}