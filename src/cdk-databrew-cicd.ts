import * as codecommit from '@aws-cdk/aws-codecommit';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as iam from '@aws-cdk/aws-iam';
import * as logs from '@aws-cdk/aws-logs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';
import { FirstCommitHandler, PreProductionLambda, ProductionLambda } from './cdk-databrew-lambda';


export interface DataBrewCodePipelineProps {
  /**
     * The ARN of the IAM role in the pre-production account.
     */
  readonly preproductionIamRoleArn: string;
  /**
     * The ARN of the IAM role in the production account.
     */
  readonly productionIamRoleArn: string;
  /**
     * The name of the S3 bucket for the CodePipeline DataBrew CICD pipeline.
     *
     * @default 'databrew-cicd-codepipelineartifactstorebucket'
     */
  readonly bucketName?: string;
  /**
     * The name of the CodeCommit repositroy for the DataBrew CICD pipeline.
     *
     * @default 'DataBrew-Recipes-Repo'
     */
  readonly repoName?: string;
  /**
     * The name of the branch that will trigger the DataBrew CICD pipeline.
     *
     * @default 'main'
     */
  readonly branchName?: string;
  /**
     * The name of the CodePipeline Databrew CICD pipeline.
     *
     * @default 'DataBrew-Recipe-Application'
     */
  readonly pipelineName?: string;
  /**
     * the (required) name of the Artifact at the first stage.
     *
     * @default 'SourceOutput'
     */
  readonly firstStageArtifactName?: string;
}
export class DataBrewCodePipeline extends cdk.Construct {
  /**
     * The ARN of the S3 bucket for the CodePipeline DataBrew CICD pipeline.
     */
  readonly bucketArn: string;
  /**
     * The name of the CodeCommit repositroy for the DataBrew CICD pipeline.
     */
  readonly repoName: string;
  /**
     * The name of the branch that will trigger the DataBrew CICD pipeline.
     */
  readonly branchName: string;
  /**
     * the (required) name of the Artifact at the first stage.
     */
  readonly firstStageArtifactName: string;
  /**
     * The ARN of the Lambda function for the pre-production account.
     */
  readonly preproductionFunctionArn: string;
  /**
     * The ARN of the Lambda function for the production account.
     */
  readonly productionFunctionArn: string;
  /**
     * The ARN of the CodeCommit repository
     */
  readonly codeCommitRepoArn: string;
  /**
     * The ARN of the DataBrew CICD pipeline.
     */
  readonly codePipelineArn: string;
  constructor(scope: cdk.Construct, name: string, props: DataBrewCodePipelineProps) {
    super(scope, name);
    this.firstStageArtifactName = props.firstStageArtifactName ?? 'SourceOutput';
    this.repoName = props.repoName ?? 'DataBrew-Recipes-Repo';
    this.branchName = props.branchName ?? 'main';

    // create a bucket
    const pipelineBucket = new s3.Bucket(this, 'CodePipelineBucket', {
      bucketName: props.bucketName ?? 'databrew-cicd-codepipelineartifactstorebucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
    pipelineBucket.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'DenyUnEncryptedObjectUploads',
      effect: iam.Effect.DENY,
      principals: [new iam.AnyPrincipal()],
      actions: ['s3:PutObject'],
      resources: [`${pipelineBucket.bucketArn}/*`],
      conditions: {
        StringNotEquals: {
          's3:x-amz-server-side-encryption': 'aws:kms',
        },
      },
    }));
    this.bucketArn = pipelineBucket.bucketArn;

    const preproductionLambda = new PreProductionLambda(this, 'PreProductionLambda', {
      bucketArn: pipelineBucket.bucketArn,
      preproductionIamRoleArn: props.preproductionIamRoleArn,
    });
    const productionLambda = new ProductionLambda(this, 'ProductionLambda', {
      bucketArn: pipelineBucket.bucketArn,
      productionIamRoleArn: props.productionIamRoleArn,
    });
    this.preproductionFunctionArn = preproductionLambda.function.functionArn;
    this.productionFunctionArn = productionLambda.function.functionArn;

    // create a CodeCommit repo
    const codeCommitRepo = new codecommit.Repository(this, 'DataBrewRepository', {
      repositoryName: 'DataBrew-Recipes-Repo',
    });
    this.codeCommitRepoArn = codeCommitRepo.repositoryArn;
    const firstCommitHelper = new FirstCommitHandler(this, 'FirstCommitLambda', {
      codeCommitRepoArn: codeCommitRepo.repositoryArn,
      repoName: codeCommitRepo.repositoryName,
      branchName: this.branchName,
    });
    const onEvent = firstCommitHelper.function;
    const lambdaInvoker = new cr.Provider(this, 'LambdaInvoker', {
      onEventHandler: onEvent,
      logRetention: logs.RetentionDays.FIVE_DAYS,
    });
    new cdk.CustomResource(this, 'CodeCommitCustomResource', {
      serviceToken: lambdaInvoker.serviceToken,
      resourceType: 'Custom::LambdaInvoker',
    });

    // create a CodePipeline pipeline
    const pipelineRole = new CodePipelineIamRole(this, 'DataBrewCodePipelineRole', {
      bucketArn: pipelineBucket.bucketArn,
      preproductionLambdaArn: this.preproductionFunctionArn,
      productionLambdaArn: this.productionFunctionArn,
    });
    pipelineRole.node.addDependency(preproductionLambda);
    pipelineRole.node.addDependency(productionLambda);

    const databrewCicdPipeline = new codepipeline.Pipeline(this, 'DataBrewCicdPipeline', {
      artifactBucket: pipelineBucket,
      role: pipelineRole.role.withoutPolicyUpdates(),
      pipelineName: props.pipelineName ?? 'DataBrew-Recipe-Application',
    });
    databrewCicdPipeline.node.addDependency(pipelineRole.role);

    const sourceAction = this.createSourceAction(codeCommitRepo, pipelineRole.role);
    const preproductionLambdaAction = new codepipeline_actions.LambdaInvokeAction({
      actionName: 'PreProd-DeployRecipe',
      lambda: preproductionLambda.function,
      role: pipelineRole.role,
    });
    const productionLambdaAction = new codepipeline_actions.LambdaInvokeAction({
      actionName: 'Prod-DeployRecipe',
      lambda: productionLambda.function,
      role: pipelineRole.role,
    });
    databrewCicdPipeline.addStage({
      stageName: 'Source',
      actions: [sourceAction],
    });
    databrewCicdPipeline.addStage({
      stageName: 'PreProd-DeployRecipe',
      actions: [preproductionLambdaAction],
    });
    databrewCicdPipeline.addStage({
      stageName: 'Prod-DeployRecipe',
      actions: [productionLambdaAction],
    });
    this.codePipelineArn = databrewCicdPipeline.pipelineArn;
  }

  /**
       * Creates a source action.
       *
       * @param codeCommitRepo the CodeCommit repository used in the DataBrew CICD pipeline.
       * @param role the IAM role used by the CodePipeline pipeline.
       * @returns the CodeCOmmit source action.
       */
  private createSourceAction = (
    codeCommitRepo: codecommit.IRepository,
    role: iam.Role): codepipeline_actions.CodeCommitSourceAction => {
    const sourceOutput = new codepipeline.Artifact(this.firstStageArtifactName);
    const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
      actionName: 'Source',
      output: sourceOutput,
      branch: this.branchName, // default: 'master'
      trigger: codepipeline_actions.CodeCommitTrigger.EVENTS,
      repository: codeCommitRepo,
      runOrder: 1,
      role: role,
    });
    return sourceAction;
  }
}

export interface InfraIamRoleProps {
  /**
     * The role name for the infrastructure account.
     *
     * @default 'CrossAccountRepositoryContributorRole'
     */
  readonly roleName?: string;
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
      description: 'The IAM role for DataBrew CICD in the infrastructure account.',
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
        'codecommit:GitPush',
      ],
      resources: [
        `arn:${cdk.Aws.PARTITION}:codecommit:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:DataBrew-Recipes-Repo`,
      ],
    }));
    role.addToPolicy(new iam.PolicyStatement({
      sid: 'CodeCommitListReposPermission',
      effect: iam.Effect.ALLOW,
      actions: [
        'codecommit:ListRepositories',
      ],
      resources: ['*'],
    }));
    this.roleArn = role.roleArn;
  }
}

export interface CodePipelineIamRoleProps {
  /**
     * The ARN of the S3 bucket where you store your artifacts.
     */
  readonly bucketArn: string;
  /**
     * The ARN of the Lambda function for the pre-production account.
     */
  readonly preproductionLambdaArn: string;
  /**
     * The ARN of the Lambda function for the production account.
     */
  readonly productionLambdaArn: string;
  /**
     * The role name for the CodePipeline CICD pipeline.
     *
     * @default 'DataBrew-Recipe-Pipeline-Role'
     */
  readonly roleName?: string;
}

export class CodePipelineIamRole extends cdk.Construct {
  /**
     * The ARN of the IAM role for the CodePipeline CICD pipeline.
     */
  readonly roleArn: string;
  /**
     * The representative of the IAM role for the CodePipeline CICD pipeline.
     */
  readonly role: iam.Role;
  constructor(scope: cdk.Construct, name: string, props: CodePipelineIamRoleProps) {
    super(scope, name);
    const role = new iam.Role(this, 'CodePipelineIamRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('codepipeline.amazonaws.com'),
        new iam.ServicePrincipal('lambda.amazonaws.com'),
      ),
      roleName: props.roleName ?? 'DataBrew-Recipe-Pipeline-Role',
      description: 'The IAM role for the CodePipeline CICD pipeline in the infrastructure account.',
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
        'codedeploy:RegisterApplicationRevision',
      ],
      resources: [
        `arn:${cdk.Aws.PARTITION}:codedeploy:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:deploymentgroup:DataBrew-Recipe-Application*`,
        `arn:${cdk.Aws.PARTITION}:codedeploy:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:application:DataBrew-Recipe-Application`,
      ],
    }));
    // CodeCommit permissions
    role.addToPolicy(new iam.PolicyStatement({
      sid: 'CodeCommitPermissions',
      effect: iam.Effect.ALLOW,
      actions: [
        'codecommit:GetBranch',
        'codecommit:GetCommit',
        'codecommit:GetUploadArchiveStatus',
        'codecommit:UploadArchive',
      ],
      resources: [
        `arn:${cdk.Aws.PARTITION}:codecommit:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:DataBrew-Recipes-Repo`,
      ],
    }));
    // S3 permissions
    role.addToPolicy(new iam.PolicyStatement({
      sid: 'S3Permissions',
      effect: iam.Effect.ALLOW,
      actions: [
        's3:GetObject',
        's3:PutObject',
      ],
      resources: [props.bucketArn],
    }));
    // Lambda permissions
    role.addToPolicy(new iam.PolicyStatement({
      sid: 'LambdaPermissions',
      effect: iam.Effect.ALLOW,
      actions: [
        'lambda:InvokeFunction',
      ],
      resources: [props.preproductionLambdaArn, props.productionLambdaArn],
    }));
    role.addToPolicy(new iam.PolicyStatement({
      sid: 'AssumRolePermissions',
      effect: iam.Effect.ALLOW,
      actions: [
        'sts:AssumeRole',
      ],
      resources: [role.roleArn],
    }));
    this.role = role;
    this.roleArn = role.roleArn;
  }
}