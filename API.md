# API Reference

**Classes**

Name|Description
----|-----------
[CodePipelineIamRole](#cdk-databrew-cicd-codepipelineiamrole)|*No description*
[DataBrewCodePipeline](#cdk-databrew-cicd-databrewcodepipeline)|*No description*
[FirstCommitHandler](#cdk-databrew-cicd-firstcommithandler)|*No description*
[IamRole](#cdk-databrew-cicd-iamrole)|IAM Role.
[InfraIamRole](#cdk-databrew-cicd-infraiamrole)|*No description*
[PreProductionLambda](#cdk-databrew-cicd-preproductionlambda)|*No description*
[ProductionLambda](#cdk-databrew-cicd-productionlambda)|*No description*


**Structs**

Name|Description
----|-----------
[CodePipelineIamRoleProps](#cdk-databrew-cicd-codepipelineiamroleprops)|*No description*
[DataBrewCodePipelineProps](#cdk-databrew-cicd-databrewcodepipelineprops)|*No description*
[FirstCommitHandlerProps](#cdk-databrew-cicd-firstcommithandlerprops)|*No description*
[IamRoleProps](#cdk-databrew-cicd-iamroleprops)|*No description*
[InfraIamRoleProps](#cdk-databrew-cicd-infraiamroleprops)|*No description*
[PreProductionLambdaProps](#cdk-databrew-cicd-preproductionlambdaprops)|*No description*
[ProductionLambdaProps](#cdk-databrew-cicd-productionlambdaprops)|*No description*



## class CodePipelineIamRole  <a id="cdk-databrew-cicd-codepipelineiamrole"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new CodePipelineIamRole(scope: Construct, name: string, props: CodePipelineIamRoleProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[CodePipelineIamRoleProps](#cdk-databrew-cicd-codepipelineiamroleprops)</code>)  *No description*
  * **bucketArn** (<code>string</code>)  The ARN of the S3 bucket where you store your artifacts. 
  * **preproductionLambdaArn** (<code>string</code>)  The ARN of the Lambda function for the pre-production account. 
  * **productionLambdaArn** (<code>string</code>)  The ARN of the Lambda function for the production account. 
  * **roleName** (<code>string</code>)  The role name for the CodePipeline CICD pipeline. __*Default*__: 'DataBrew-Recipe-Pipeline-Role'



### Properties


Name | Type | Description 
-----|------|-------------
**role** | <code>[aws_iam.Role](#aws-cdk-lib-aws-iam-role)</code> | The representative of the IAM role for the CodePipeline CICD pipeline.
**roleArn** | <code>string</code> | The ARN of the IAM role for the CodePipeline CICD pipeline.



## class DataBrewCodePipeline  <a id="cdk-databrew-cicd-databrewcodepipeline"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new DataBrewCodePipeline(scope: Construct, name: string, props: DataBrewCodePipelineProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[DataBrewCodePipelineProps](#cdk-databrew-cicd-databrewcodepipelineprops)</code>)  *No description*
  * **preproductionIamRoleArn** (<code>string</code>)  The ARN of the IAM role in the pre-production account. 
  * **productionIamRoleArn** (<code>string</code>)  The ARN of the IAM role in the production account. 
  * **branchName** (<code>string</code>)  The name of the branch that will trigger the DataBrew CICD pipeline. __*Default*__: 'main'
  * **bucketName** (<code>string</code>)  The name of the S3 bucket for the CodePipeline DataBrew CICD pipeline. __*Default*__: 'databrew-cicd-codepipelineartifactstorebucket'
  * **firstStageArtifactName** (<code>string</code>)  the (required) name of the Artifact at the first stage. __*Default*__: 'SourceOutput'
  * **pipelineName** (<code>string</code>)  The name of the CodePipeline Databrew CICD pipeline. __*Default*__: 'DataBrew-Recipe-Application'
  * **repoName** (<code>string</code>)  The name of the CodeCommit repositroy for the DataBrew CICD pipeline. __*Default*__: 'DataBrew-Recipes-Repo'



### Properties


Name | Type | Description 
-----|------|-------------
**branchName** | <code>string</code> | The name of the branch that will trigger the DataBrew CICD pipeline.
**bucketArn** | <code>string</code> | The ARN of the S3 bucket for the CodePipeline DataBrew CICD pipeline.
**codeCommitRepoArn** | <code>string</code> | The ARN of the CodeCommit repository.
**codePipelineArn** | <code>string</code> | The ARN of the DataBrew CICD pipeline.
**firstStageArtifactName** | <code>string</code> | the (required) name of the Artifact at the first stage.
**preproductionFunctionArn** | <code>string</code> | The ARN of the Lambda function for the pre-production account.
**productionFunctionArn** | <code>string</code> | The ARN of the Lambda function for the production account.
**repoName** | <code>string</code> | The name of the CodeCommit repositroy for the DataBrew CICD pipeline.



## class FirstCommitHandler  <a id="cdk-databrew-cicd-firstcommithandler"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new FirstCommitHandler(scope: Construct, name: string, props: FirstCommitHandlerProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[FirstCommitHandlerProps](#cdk-databrew-cicd-firstcommithandlerprops)</code>)  *No description*
  * **branchName** (<code>string</code>)  The branch name used in the CodeCommit repo. 
  * **codeCommitRepoArn** (<code>string</code>)  The ARN of the CodeCommit repository. 
  * **repoName** (<code>string</code>)  The name of the CodeCommit repo. 
  * **functionName** (<code>string</code>)  The name of the Lambda function which deals with first commit via AWS CodeCommit. __*Default*__: 'FirstCommitHandler'
  * **roleName** (<code>string</code>)  The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit. __*Default*__: 'LambdaForInitialCommitRole'



### Properties


Name | Type | Description 
-----|------|-------------
**function** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | The representative of Lambda function which deals with first commit via AWS CodeCommit.
**functionName** | <code>string</code> | The name of the Lambda function which deals with first commit via AWS CodeCommit.
**roleName** | <code>string</code> | The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit.



## class IamRole  <a id="cdk-databrew-cicd-iamrole"></a>

IAM Role.

Defines an IAM role for pre-production and production AWS accounts.

__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new IamRole(scope: Construct, name: string, props: IamRoleProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[IamRoleProps](#cdk-databrew-cicd-iamroleprops)</code>)  *No description*
  * **accountID** (<code>string</code>)  The ID of your infrastructure account. 
  * **environment** (<code>string</code>)  'preproduction' or 'production'. 
  * **roleName** (<code>string</code>)  The role name. __*Default*__: '{environment}-Databrew-Cicd-Role'



### Properties


Name | Type | Description 
-----|------|-------------
**roleArn** | <code>string</code> | The ARN of the IAM role for pre-production or production.



## class InfraIamRole  <a id="cdk-databrew-cicd-infraiamrole"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new InfraIamRole(scope: Construct, name: string, props: InfraIamRoleProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[InfraIamRoleProps](#cdk-databrew-cicd-infraiamroleprops)</code>)  *No description*
  * **roleName** (<code>string</code>)  The role name for the infrastructure account. __*Default*__: 'CrossAccountRepositoryContributorRole'



### Properties


Name | Type | Description 
-----|------|-------------
**roleArn** | <code>string</code> | The ARN of the IAM role for the infrastructure account.



## class PreProductionLambda  <a id="cdk-databrew-cicd-preproductionlambda"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new PreProductionLambda(scope: Construct, name: string, props: PreProductionLambdaProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[PreProductionLambdaProps](#cdk-databrew-cicd-preproductionlambdaprops)</code>)  *No description*
  * **bucketArn** (<code>string</code>)  The ARN of the S3 bucket for the DataBrew CICD pipeline. 
  * **preproductionIamRoleArn** (<code>string</code>)  The ARN of the IAM role in the pre-production account. 
  * **functionName** (<code>string</code>)  The Lambda funciton name for the pre-production account. __*Default*__: 'PreProd-DataBrew-Recipe-Deployer'
  * **roleName** (<code>string</code>)  The name of the IAM role for the pre-produciton Lambda function. __*Default*__: 'PreProd-DataBrew-Recipe-Deployer-role'



### Properties


Name | Type | Description 
-----|------|-------------
**function** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | The representative of Lambda function for the pre-production account.
**functionName** | <code>string</code> | The Lambda funciton name for the pre-production account.
**roleName** | <code>string</code> | The name of the IAM role for the pre-produciton Lambda function.



## class ProductionLambda  <a id="cdk-databrew-cicd-productionlambda"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new ProductionLambda(scope: Construct, name: string, props: ProductionLambdaProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[ProductionLambdaProps](#cdk-databrew-cicd-productionlambdaprops)</code>)  *No description*
  * **bucketArn** (<code>string</code>)  The ARN of the S3 bucket for the DataBrew CICD pipeline. 
  * **productionIamRoleArn** (<code>string</code>)  The ARN of the IAM role in the production account. 
  * **functionName** (<code>string</code>)  The Lambda funciton name for the production account. __*Default*__: 'Prod-DataBrew-Recipe-Deployer'
  * **roleName** (<code>string</code>)  The name of the IAM role for the produciton Lambda function. __*Default*__: 'Prod-DataBrew-Recipe-Deployer-role'



### Properties


Name | Type | Description 
-----|------|-------------
**function** | <code>[aws_lambda.IFunction](#aws-cdk-lib-aws-lambda-ifunction)</code> | The representative of Lambda function for the production account.
**functionName** | <code>string</code> | The Lambda funciton name for the production account.
**roleName** | <code>string</code> | The name of the IAM role for the produciton Lambda function.



## struct CodePipelineIamRoleProps  <a id="cdk-databrew-cicd-codepipelineiamroleprops"></a>






Name | Type | Description 
-----|------|-------------
**bucketArn** | <code>string</code> | The ARN of the S3 bucket where you store your artifacts.
**preproductionLambdaArn** | <code>string</code> | The ARN of the Lambda function for the pre-production account.
**productionLambdaArn** | <code>string</code> | The ARN of the Lambda function for the production account.
**roleName**? | <code>string</code> | The role name for the CodePipeline CICD pipeline.<br/>__*Default*__: 'DataBrew-Recipe-Pipeline-Role'



## struct DataBrewCodePipelineProps  <a id="cdk-databrew-cicd-databrewcodepipelineprops"></a>






Name | Type | Description 
-----|------|-------------
**preproductionIamRoleArn** | <code>string</code> | The ARN of the IAM role in the pre-production account.
**productionIamRoleArn** | <code>string</code> | The ARN of the IAM role in the production account.
**branchName**? | <code>string</code> | The name of the branch that will trigger the DataBrew CICD pipeline.<br/>__*Default*__: 'main'
**bucketName**? | <code>string</code> | The name of the S3 bucket for the CodePipeline DataBrew CICD pipeline.<br/>__*Default*__: 'databrew-cicd-codepipelineartifactstorebucket'
**firstStageArtifactName**? | <code>string</code> | the (required) name of the Artifact at the first stage.<br/>__*Default*__: 'SourceOutput'
**pipelineName**? | <code>string</code> | The name of the CodePipeline Databrew CICD pipeline.<br/>__*Default*__: 'DataBrew-Recipe-Application'
**repoName**? | <code>string</code> | The name of the CodeCommit repositroy for the DataBrew CICD pipeline.<br/>__*Default*__: 'DataBrew-Recipes-Repo'



## struct FirstCommitHandlerProps  <a id="cdk-databrew-cicd-firstcommithandlerprops"></a>






Name | Type | Description 
-----|------|-------------
**branchName** | <code>string</code> | The branch name used in the CodeCommit repo.
**codeCommitRepoArn** | <code>string</code> | The ARN of the CodeCommit repository.
**repoName** | <code>string</code> | The name of the CodeCommit repo.
**functionName**? | <code>string</code> | The name of the Lambda function which deals with first commit via AWS CodeCommit.<br/>__*Default*__: 'FirstCommitHandler'
**roleName**? | <code>string</code> | The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit.<br/>__*Default*__: 'LambdaForInitialCommitRole'



## struct IamRoleProps  <a id="cdk-databrew-cicd-iamroleprops"></a>






Name | Type | Description 
-----|------|-------------
**accountID** | <code>string</code> | The ID of your infrastructure account.
**environment** | <code>string</code> | 'preproduction' or 'production'.
**roleName**? | <code>string</code> | The role name.<br/>__*Default*__: '{environment}-Databrew-Cicd-Role'



## struct InfraIamRoleProps  <a id="cdk-databrew-cicd-infraiamroleprops"></a>






Name | Type | Description 
-----|------|-------------
**roleName**? | <code>string</code> | The role name for the infrastructure account.<br/>__*Default*__: 'CrossAccountRepositoryContributorRole'



## struct PreProductionLambdaProps  <a id="cdk-databrew-cicd-preproductionlambdaprops"></a>






Name | Type | Description 
-----|------|-------------
**bucketArn** | <code>string</code> | The ARN of the S3 bucket for the DataBrew CICD pipeline.
**preproductionIamRoleArn** | <code>string</code> | The ARN of the IAM role in the pre-production account.
**functionName**? | <code>string</code> | The Lambda funciton name for the pre-production account.<br/>__*Default*__: 'PreProd-DataBrew-Recipe-Deployer'
**roleName**? | <code>string</code> | The name of the IAM role for the pre-produciton Lambda function.<br/>__*Default*__: 'PreProd-DataBrew-Recipe-Deployer-role'



## struct ProductionLambdaProps  <a id="cdk-databrew-cicd-productionlambdaprops"></a>






Name | Type | Description 
-----|------|-------------
**bucketArn** | <code>string</code> | The ARN of the S3 bucket for the DataBrew CICD pipeline.
**productionIamRoleArn** | <code>string</code> | The ARN of the IAM role in the production account.
**functionName**? | <code>string</code> | The Lambda funciton name for the production account.<br/>__*Default*__: 'Prod-DataBrew-Recipe-Deployer'
**roleName**? | <code>string</code> | The name of the IAM role for the produciton Lambda function.<br/>__*Default*__: 'Prod-DataBrew-Recipe-Deployer-role'



