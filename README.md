# cdk-databrew-cicd
A demonstration of CICD with AWS Databrew  
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](https://opensource.org/licenses/Apache-2.0)  
[![Build](https://github.com/HsiehShuJeng/cdk-databrew-cicd/actions/workflows/build.yml/badge.svg)](https://github.com/HsiehShuJeng/cdk-databrew-cicd/actions/workflows/build.yml) [![Release](https://github.com/HsiehShuJeng/cdk-databrew-cicd/workflows/Release/badge.svg)](https://github.com/HsiehShuJeng/cdk-databrew-cicd/actions/workflows/release.yml)  
[![Python](https://img.shields.io/pypi/pyversions/cdk-databrew-cicd)](https://pypi.org/) [![pip](https://img.shields.io/badge/pip%20install-cdk--databrew--cicd-blue)](https://pypi.org/project/cdk-databrew-cicd/)  
[![npm version](https://img.shields.io/npm/v/cdk-databrew-cicd)](https://www.npmjs.com/package/cdk-databrew-cicd) [![pypi evrsion](https://img.shields.io/pypi/v/cdk-databrew-cicd)](https://pypi.org/project/cdk-databrew-cicd/) [![Maven](https://img.shields.io/maven-central/v/io.github.hsiehshujeng/cdk-databrew-cicd)](https://search.maven.org/search?q=a:cdk-databrew-cicd) [![nuget](https://img.shields.io/nuget/v/Databrew.Cicd)](https://www.nuget.org/packages/Databrew.Cicd/)  

# Example  
## Typescript  
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/typescript).    
```bash
$ cdk --init language typescript
$ yarn add cdk-databrew-cicd
```  
```typescript
import * as cdk from '@aws-cdk/core';
import { DataBrewCodePipeline } from 'cdk-databrew-cicd';

class TypescriptStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const preproductionAccountId = 'PREPRODUCTION_ACCOUNT_ID';
    const productionAccountId = 'PRODUCTION_ACCOUNT_ID';

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
  stackName: 'DataBrew-CICD'
});
```
## Python
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/python).   
```bash
# upgrading related Python packages
$ python -m ensurepip --upgrade
$ python -m pip install --upgrade pip
$ python -m pip install --upgrade virtualenv
# initialize a CDK Python project
$ cdk init --language python
# make packages installed locally instead of globally
$ source .venv/bin/activate
$ cat <<EOL > requirements.txt
aws-cdk.core
cdk-databrew-cicd
EOL
$ python -m pip install -r requirements.txt
```  
```python
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
```
```bash
$ deactivate
```
## Java  
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/java).  
```bash
$ cdk init --language java
$ mvn package
```
```xml
.
.
<properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      <cdk.version>1.107.0</cdk.version>
      <constrcut.verion>0.1.4</constrcut.verion>
      <junit.version>5.7.1</junit.version>
</properties>
 .
 .
 <dependencies>
     <!-- AWS Cloud Development Kit -->
      <dependency>
            <groupId>software.amazon.awscdk</groupId>
            <artifactId>core</artifactId>
            <version>${cdk.version}</version>
      </dependency>
      <dependency>
        <groupId>io.github.hsiehshujeng</groupId>
        <artifactId>cdk-databrew-cicd</artifactId>
        <version>${constrcut.verion}</version>
        </dependency>
     .
     .
     .
 </dependencies>
```
```java
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
                CfnOutputProps.builder()
                    .value(databrewPipeline.getPreproductionFunctionArn())
                    .build());
        new CfnOutput(this, "OProductionLambdaArn",
                CfnOutputProps.builder()
                    .value(databrewPipeline.getProductionFunctionArn())
                    .build());
        new CfnOutput(this, "OCodeCommitRepoArn",
                CfnOutputProps.builder()
                    .value(databrewPipeline.getCodeCommitRepoArn())
                    .build());
        new CfnOutput(this, "OCodePipelineArn",
                CfnOutputProps.builder()
                    .value(databrewPipeline.getCodePipelineArn())
                    .build());
    }
}
```
## C#  
You could also refer to [here](https://github.com/HsiehShuJeng/cdk-lambda-subminute/tree/main/src/demo/csharp).  
```bash
$ cdk init --language csharp
$ dotnet add src/Csharp package Amazon.CDK.AWS.Lambda
$ dotnet add src/Csharp package Lambda.Subminute --version 0.1.6
```
```cs
using Amazon.CDK;
using Amazon.CDK.AWS.Lambda;
using ScottHsieh.Cdk;

namespace Csharp
{
    public class CsharpStack : Stack
    {
        internal CsharpStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            var targetLambda = new Function(this, "targetFunction", new FunctionProps
            {
                Code = Code.FromInline("exports.handler = function(event, ctx, cb) { return cb(null, \"hi\"); })"),
                FunctionName = "testTargetFunction",
                Runtime = Runtime.NODEJS_12_X,
                Handler = "index.handler"
            });
            string cronJobExample = "cron(50/1 6-7 ? * SUN-SAT *)";
            var subminuteMaster = new LambdaSubminute(this, "LambdaSubminute", new LambdaSubminuteProps
            {
                TargetFunction = targetLambda,
                CronjobExpression = cronJobExample,
                Frequency = 10,
                IntervalTime = 6,
            });
        
            new CfnOutput(this, "OStateMachineArn", new CfnOutputProps
            {
                Value = subminuteMaster.StateMachineArn
            });
            new CfnOutput(this, "OIteratorFunctionArn", new CfnOutputProps
            {
                Value = subminuteMaster.IteratorFunction.FunctionArn
            });
        }
    }
}
```

## Some Efforts after Stack Creation  
### CodeCommit  
1. Create HTTPS Git credentials for AWS CodeCommit with an IAM user that you're going to use.  
![image](https://raw.githubusercontent.com/HsiehShuJeng/cdk-databrew-cicd/main/images/codecommit_credentials.png)  
2. Run through the steps noted on the README.md of the CodeCommit repository after finishing establishing the stack via CDK. The returned message with success should be looked like the following (assume you have installed [`git-remote-codecommit`](https://pypi.org/project/git-remote-codecommit/)):  
   ```bash
   $ git clone codecommit://scott.codecommit@DataBrew-Recipes-Repo
   Cloning into 'DataBrew-Recipes-Repo'...
   remote: Counting objects: 6, done.
   Unpacking objects: 100% (6/6), 2.03 KiB | 138.00 KiB/s, done.
   ```  
3. Add a DataBrew recipe into the local repositroy (directory) and commit the change. (either directly on the main branch or merging another branch into the main branch)  

### Glue DataBrew  
1. Download any recipe either generated out by following [*Getting started with AWS Glue DataBrew*](https://docs.aws.amazon.com/zh_tw/databrew/latest/dg/getting-started.html) or made by yourself as **JSON file**.  
   ![image](https://raw.githubusercontent.com/HsiehShuJeng/cdk-databrew-cicd/main/images/databrew_recipes.png)   
2. Move the recipe from the download directory to the local directory for the CodeCommit repository.   
   ```bash
   $ mv ${DOWNLOAD_DIRECTORY}/chess-project-recipe.json ${CODECOMMIT_LOCAL_DIRECTORY}/
   ```
3. Commit the change to a branch with a name you prefer. 
   ```bash
   $ cd ${{CODECOMMIT_LOCAL_DIRECTORY}}
   $ git checkout -b add-recipe main
   $ git add .
   $ git commit -m "first recipe"
   $ git push --set-upstream origin add-recipe
   ```
4. Merge the branch into the main branch. Just go to the **AWS CodeCommit** web console to do the merge as its process is purely the same as you've already done thousands of times on **Github** but only with different UIs.  

## How Successful Commits Look Like  
1. In the infrastructure account, the status of the CodePipeline DataBrew pipeline should be similar as the following:  
   ![image](https://raw.githubusercontent.com/HsiehShuJeng/cdk-databrew-cicd/main/images/infra_codepipeline.png)  
1. In the **pre-production** account with the same region as where the CICD pipeline is deployed at the infrastructue account, you'll see this.  
   ![image](https://raw.githubusercontent.com/HsiehShuJeng/cdk-databrew-cicd/main/images/preproduction-recipe.png)  
2. In the **production** account with the same region as where the CICD pipeline is deployed at the infrastructue account, you'll see this.   
   ![image](https://raw.githubusercontent.com/HsiehShuJeng/cdk-databrew-cicd/main/images/production-recipe.png)  

