# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CodePipelineIamRole <a name="CodePipelineIamRole" id="cdk-databrew-cicd.CodePipelineIamRole"></a>

#### Initializers <a name="Initializers" id="cdk-databrew-cicd.CodePipelineIamRole.Initializer"></a>

```typescript
import { CodePipelineIamRole } from 'cdk-databrew-cicd'

new CodePipelineIamRole(scope: Construct, name: string, props: CodePipelineIamRoleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-databrew-cicd.CodePipelineIamRoleProps">CodePipelineIamRoleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-databrew-cicd.CodePipelineIamRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-databrew-cicd.CodePipelineIamRole.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-databrew-cicd.CodePipelineIamRole.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-databrew-cicd.CodePipelineIamRoleProps">CodePipelineIamRoleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-databrew-cicd.CodePipelineIamRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-databrew-cicd.CodePipelineIamRole.isConstruct"></a>

```typescript
import { CodePipelineIamRole } from 'cdk-databrew-cicd'

CodePipelineIamRole.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-databrew-cicd.CodePipelineIamRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | The representative of the IAM role for the CodePipeline CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRole.property.roleArn">roleArn</a></code> | <code>string</code> | The ARN of the IAM role for the CodePipeline CICD pipeline. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-databrew-cicd.CodePipelineIamRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `role`<sup>Required</sup> <a name="role" id="cdk-databrew-cicd.CodePipelineIamRole.property.role"></a>

```typescript
public readonly role: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

The representative of the IAM role for the CodePipeline CICD pipeline.

---

##### `roleArn`<sup>Required</sup> <a name="roleArn" id="cdk-databrew-cicd.CodePipelineIamRole.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string

The ARN of the IAM role for the CodePipeline CICD pipeline.

---


### DataBrewCodePipeline <a name="DataBrewCodePipeline" id="cdk-databrew-cicd.DataBrewCodePipeline"></a>

#### Initializers <a name="Initializers" id="cdk-databrew-cicd.DataBrewCodePipeline.Initializer"></a>

```typescript
import { DataBrewCodePipeline } from 'cdk-databrew-cicd'

new DataBrewCodePipeline(scope: Construct, name: string, props: DataBrewCodePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps">DataBrewCodePipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-databrew-cicd.DataBrewCodePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-databrew-cicd.DataBrewCodePipeline.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-databrew-cicd.DataBrewCodePipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-databrew-cicd.DataBrewCodePipelineProps">DataBrewCodePipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-databrew-cicd.DataBrewCodePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-databrew-cicd.DataBrewCodePipeline.isConstruct"></a>

```typescript
import { DataBrewCodePipeline } from 'cdk-databrew-cicd'

DataBrewCodePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-databrew-cicd.DataBrewCodePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.branchName">branchName</a></code> | <code>string</code> | The name of the branch that will trigger the DataBrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.bucketArn">bucketArn</a></code> | <code>string</code> | The ARN of the S3 bucket for the CodePipeline DataBrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.codeCommitRepoArn">codeCommitRepoArn</a></code> | <code>string</code> | The ARN of the CodeCommit repository. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.codePipelineArn">codePipelineArn</a></code> | <code>string</code> | The ARN of the DataBrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.firstStageArtifactName">firstStageArtifactName</a></code> | <code>string</code> | the (required) name of the Artifact at the first stage. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.preproductionFunctionArn">preproductionFunctionArn</a></code> | <code>string</code> | The ARN of the Lambda function for the pre-production account. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.productionFunctionArn">productionFunctionArn</a></code> | <code>string</code> | The ARN of the Lambda function for the production account. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipeline.property.repoName">repoName</a></code> | <code>string</code> | The name of the CodeCommit repositroy for the DataBrew CICD pipeline. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-databrew-cicd.DataBrewCodePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="cdk-databrew-cicd.DataBrewCodePipeline.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

The name of the branch that will trigger the DataBrew CICD pipeline.

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="cdk-databrew-cicd.DataBrewCodePipeline.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

The ARN of the S3 bucket for the CodePipeline DataBrew CICD pipeline.

---

##### `codeCommitRepoArn`<sup>Required</sup> <a name="codeCommitRepoArn" id="cdk-databrew-cicd.DataBrewCodePipeline.property.codeCommitRepoArn"></a>

```typescript
public readonly codeCommitRepoArn: string;
```

- *Type:* string

The ARN of the CodeCommit repository.

---

##### `codePipelineArn`<sup>Required</sup> <a name="codePipelineArn" id="cdk-databrew-cicd.DataBrewCodePipeline.property.codePipelineArn"></a>

```typescript
public readonly codePipelineArn: string;
```

- *Type:* string

The ARN of the DataBrew CICD pipeline.

---

##### `firstStageArtifactName`<sup>Required</sup> <a name="firstStageArtifactName" id="cdk-databrew-cicd.DataBrewCodePipeline.property.firstStageArtifactName"></a>

```typescript
public readonly firstStageArtifactName: string;
```

- *Type:* string

the (required) name of the Artifact at the first stage.

---

##### `preproductionFunctionArn`<sup>Required</sup> <a name="preproductionFunctionArn" id="cdk-databrew-cicd.DataBrewCodePipeline.property.preproductionFunctionArn"></a>

```typescript
public readonly preproductionFunctionArn: string;
```

- *Type:* string

The ARN of the Lambda function for the pre-production account.

---

##### `productionFunctionArn`<sup>Required</sup> <a name="productionFunctionArn" id="cdk-databrew-cicd.DataBrewCodePipeline.property.productionFunctionArn"></a>

```typescript
public readonly productionFunctionArn: string;
```

- *Type:* string

The ARN of the Lambda function for the production account.

---

##### `repoName`<sup>Required</sup> <a name="repoName" id="cdk-databrew-cicd.DataBrewCodePipeline.property.repoName"></a>

```typescript
public readonly repoName: string;
```

- *Type:* string

The name of the CodeCommit repositroy for the DataBrew CICD pipeline.

---


### FirstCommitHandler <a name="FirstCommitHandler" id="cdk-databrew-cicd.FirstCommitHandler"></a>

#### Initializers <a name="Initializers" id="cdk-databrew-cicd.FirstCommitHandler.Initializer"></a>

```typescript
import { FirstCommitHandler } from 'cdk-databrew-cicd'

new FirstCommitHandler(scope: Construct, name: string, props: FirstCommitHandlerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-databrew-cicd.FirstCommitHandlerProps">FirstCommitHandlerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-databrew-cicd.FirstCommitHandler.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-databrew-cicd.FirstCommitHandler.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-databrew-cicd.FirstCommitHandler.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-databrew-cicd.FirstCommitHandlerProps">FirstCommitHandlerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-databrew-cicd.FirstCommitHandler.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-databrew-cicd.FirstCommitHandler.isConstruct"></a>

```typescript
import { FirstCommitHandler } from 'cdk-databrew-cicd'

FirstCommitHandler.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-databrew-cicd.FirstCommitHandler.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.property.function">function</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The representative of Lambda function which deals with first commit via AWS CodeCommit. |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.property.functionName">functionName</a></code> | <code>string</code> | The name of the Lambda function which deals with first commit via AWS CodeCommit. |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandler.property.roleName">roleName</a></code> | <code>string</code> | The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-databrew-cicd.FirstCommitHandler.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `function`<sup>Required</sup> <a name="function" id="cdk-databrew-cicd.FirstCommitHandler.property.function"></a>

```typescript
public readonly function: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The representative of Lambda function which deals with first commit via AWS CodeCommit.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="cdk-databrew-cicd.FirstCommitHandler.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

The name of the Lambda function which deals with first commit via AWS CodeCommit.

---

##### `roleName`<sup>Required</sup> <a name="roleName" id="cdk-databrew-cicd.FirstCommitHandler.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string

The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit.

---


### IamRole <a name="IamRole" id="cdk-databrew-cicd.IamRole"></a>

IAM Role.

Defines an IAM role for pre-production and production AWS accounts.

#### Initializers <a name="Initializers" id="cdk-databrew-cicd.IamRole.Initializer"></a>

```typescript
import { IamRole } from 'cdk-databrew-cicd'

new IamRole(scope: Construct, name: string, props: IamRoleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.IamRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.IamRole.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.IamRole.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-databrew-cicd.IamRoleProps">IamRoleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-databrew-cicd.IamRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-databrew-cicd.IamRole.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-databrew-cicd.IamRole.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-databrew-cicd.IamRoleProps">IamRoleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.IamRole.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-databrew-cicd.IamRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.IamRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-databrew-cicd.IamRole.isConstruct"></a>

```typescript
import { IamRole } from 'cdk-databrew-cicd'

IamRole.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-databrew-cicd.IamRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.IamRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-databrew-cicd.IamRole.property.roleArn">roleArn</a></code> | <code>string</code> | The ARN of the IAM role for pre-production or production. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-databrew-cicd.IamRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `roleArn`<sup>Required</sup> <a name="roleArn" id="cdk-databrew-cicd.IamRole.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string

The ARN of the IAM role for pre-production or production.

---


### InfraIamRole <a name="InfraIamRole" id="cdk-databrew-cicd.InfraIamRole"></a>

#### Initializers <a name="Initializers" id="cdk-databrew-cicd.InfraIamRole.Initializer"></a>

```typescript
import { InfraIamRole } from 'cdk-databrew-cicd'

new InfraIamRole(scope: Construct, name: string, props: InfraIamRoleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.InfraIamRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.InfraIamRole.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.InfraIamRole.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-databrew-cicd.InfraIamRoleProps">InfraIamRoleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-databrew-cicd.InfraIamRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-databrew-cicd.InfraIamRole.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-databrew-cicd.InfraIamRole.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-databrew-cicd.InfraIamRoleProps">InfraIamRoleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.InfraIamRole.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-databrew-cicd.InfraIamRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.InfraIamRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-databrew-cicd.InfraIamRole.isConstruct"></a>

```typescript
import { InfraIamRole } from 'cdk-databrew-cicd'

InfraIamRole.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-databrew-cicd.InfraIamRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.InfraIamRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-databrew-cicd.InfraIamRole.property.roleArn">roleArn</a></code> | <code>string</code> | The ARN of the IAM role for the infrastructure account. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-databrew-cicd.InfraIamRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `roleArn`<sup>Required</sup> <a name="roleArn" id="cdk-databrew-cicd.InfraIamRole.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string

The ARN of the IAM role for the infrastructure account.

---


### PreProductionLambda <a name="PreProductionLambda" id="cdk-databrew-cicd.PreProductionLambda"></a>

#### Initializers <a name="Initializers" id="cdk-databrew-cicd.PreProductionLambda.Initializer"></a>

```typescript
import { PreProductionLambda } from 'cdk-databrew-cicd'

new PreProductionLambda(scope: Construct, name: string, props: PreProductionLambdaProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-databrew-cicd.PreProductionLambdaProps">PreProductionLambdaProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-databrew-cicd.PreProductionLambda.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-databrew-cicd.PreProductionLambda.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-databrew-cicd.PreProductionLambda.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-databrew-cicd.PreProductionLambdaProps">PreProductionLambdaProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-databrew-cicd.PreProductionLambda.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-databrew-cicd.PreProductionLambda.isConstruct"></a>

```typescript
import { PreProductionLambda } from 'cdk-databrew-cicd'

PreProductionLambda.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-databrew-cicd.PreProductionLambda.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.property.function">function</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The representative of Lambda function for the pre-production account. |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.property.functionName">functionName</a></code> | <code>string</code> | The Lambda funciton name for the pre-production account. |
| <code><a href="#cdk-databrew-cicd.PreProductionLambda.property.roleName">roleName</a></code> | <code>string</code> | The name of the IAM role for the pre-produciton Lambda function. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-databrew-cicd.PreProductionLambda.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `function`<sup>Required</sup> <a name="function" id="cdk-databrew-cicd.PreProductionLambda.property.function"></a>

```typescript
public readonly function: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The representative of Lambda function for the pre-production account.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="cdk-databrew-cicd.PreProductionLambda.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

The Lambda funciton name for the pre-production account.

---

##### `roleName`<sup>Required</sup> <a name="roleName" id="cdk-databrew-cicd.PreProductionLambda.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string

The name of the IAM role for the pre-produciton Lambda function.

---


### ProductionLambda <a name="ProductionLambda" id="cdk-databrew-cicd.ProductionLambda"></a>

#### Initializers <a name="Initializers" id="cdk-databrew-cicd.ProductionLambda.Initializer"></a>

```typescript
import { ProductionLambda } from 'cdk-databrew-cicd'

new ProductionLambda(scope: Construct, name: string, props: ProductionLambdaProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-databrew-cicd.ProductionLambdaProps">ProductionLambdaProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-databrew-cicd.ProductionLambda.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-databrew-cicd.ProductionLambda.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-databrew-cicd.ProductionLambda.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-databrew-cicd.ProductionLambdaProps">ProductionLambdaProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-databrew-cicd.ProductionLambda.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-databrew-cicd.ProductionLambda.isConstruct"></a>

```typescript
import { ProductionLambda } from 'cdk-databrew-cicd'

ProductionLambda.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-databrew-cicd.ProductionLambda.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.property.function">function</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The representative of Lambda function for the production account. |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.property.functionName">functionName</a></code> | <code>string</code> | The Lambda funciton name for the production account. |
| <code><a href="#cdk-databrew-cicd.ProductionLambda.property.roleName">roleName</a></code> | <code>string</code> | The name of the IAM role for the produciton Lambda function. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-databrew-cicd.ProductionLambda.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `function`<sup>Required</sup> <a name="function" id="cdk-databrew-cicd.ProductionLambda.property.function"></a>

```typescript
public readonly function: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The representative of Lambda function for the production account.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="cdk-databrew-cicd.ProductionLambda.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

The Lambda funciton name for the production account.

---

##### `roleName`<sup>Required</sup> <a name="roleName" id="cdk-databrew-cicd.ProductionLambda.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string

The name of the IAM role for the produciton Lambda function.

---


## Structs <a name="Structs" id="Structs"></a>

### CodePipelineIamRoleProps <a name="CodePipelineIamRoleProps" id="cdk-databrew-cicd.CodePipelineIamRoleProps"></a>

#### Initializer <a name="Initializer" id="cdk-databrew-cicd.CodePipelineIamRoleProps.Initializer"></a>

```typescript
import { CodePipelineIamRoleProps } from 'cdk-databrew-cicd'

const codePipelineIamRoleProps: CodePipelineIamRoleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRoleProps.property.bucketArn">bucketArn</a></code> | <code>string</code> | The ARN of the S3 bucket where you store your artifacts. |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRoleProps.property.preproductionLambdaArn">preproductionLambdaArn</a></code> | <code>string</code> | The ARN of the Lambda function for the pre-production account. |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRoleProps.property.productionLambdaArn">productionLambdaArn</a></code> | <code>string</code> | The ARN of the Lambda function for the production account. |
| <code><a href="#cdk-databrew-cicd.CodePipelineIamRoleProps.property.roleName">roleName</a></code> | <code>string</code> | The role name for the CodePipeline CICD pipeline. |

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="cdk-databrew-cicd.CodePipelineIamRoleProps.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

The ARN of the S3 bucket where you store your artifacts.

---

##### `preproductionLambdaArn`<sup>Required</sup> <a name="preproductionLambdaArn" id="cdk-databrew-cicd.CodePipelineIamRoleProps.property.preproductionLambdaArn"></a>

```typescript
public readonly preproductionLambdaArn: string;
```

- *Type:* string

The ARN of the Lambda function for the pre-production account.

---

##### `productionLambdaArn`<sup>Required</sup> <a name="productionLambdaArn" id="cdk-databrew-cicd.CodePipelineIamRoleProps.property.productionLambdaArn"></a>

```typescript
public readonly productionLambdaArn: string;
```

- *Type:* string

The ARN of the Lambda function for the production account.

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="cdk-databrew-cicd.CodePipelineIamRoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* 'DataBrew-Recipe-Pipeline-Role'

The role name for the CodePipeline CICD pipeline.

---

### DataBrewCodePipelineProps <a name="DataBrewCodePipelineProps" id="cdk-databrew-cicd.DataBrewCodePipelineProps"></a>

#### Initializer <a name="Initializer" id="cdk-databrew-cicd.DataBrewCodePipelineProps.Initializer"></a>

```typescript
import { DataBrewCodePipelineProps } from 'cdk-databrew-cicd'

const dataBrewCodePipelineProps: DataBrewCodePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps.property.preproductionIamRoleArn">preproductionIamRoleArn</a></code> | <code>string</code> | The ARN of the IAM role in the pre-production account. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps.property.productionIamRoleArn">productionIamRoleArn</a></code> | <code>string</code> | The ARN of the IAM role in the production account. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps.property.branchName">branchName</a></code> | <code>string</code> | The name of the branch that will trigger the DataBrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps.property.bucketName">bucketName</a></code> | <code>string</code> | The name of the S3 bucket for the CodePipeline DataBrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps.property.firstStageArtifactName">firstStageArtifactName</a></code> | <code>string</code> | the (required) name of the Artifact at the first stage. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps.property.pipelineName">pipelineName</a></code> | <code>string</code> | The name of the CodePipeline Databrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.DataBrewCodePipelineProps.property.repoName">repoName</a></code> | <code>string</code> | The name of the CodeCommit repositroy for the DataBrew CICD pipeline. |

---

##### `preproductionIamRoleArn`<sup>Required</sup> <a name="preproductionIamRoleArn" id="cdk-databrew-cicd.DataBrewCodePipelineProps.property.preproductionIamRoleArn"></a>

```typescript
public readonly preproductionIamRoleArn: string;
```

- *Type:* string

The ARN of the IAM role in the pre-production account.

---

##### `productionIamRoleArn`<sup>Required</sup> <a name="productionIamRoleArn" id="cdk-databrew-cicd.DataBrewCodePipelineProps.property.productionIamRoleArn"></a>

```typescript
public readonly productionIamRoleArn: string;
```

- *Type:* string

The ARN of the IAM role in the production account.

---

##### `branchName`<sup>Optional</sup> <a name="branchName" id="cdk-databrew-cicd.DataBrewCodePipelineProps.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string
- *Default:* 'main'

The name of the branch that will trigger the DataBrew CICD pipeline.

---

##### `bucketName`<sup>Optional</sup> <a name="bucketName" id="cdk-databrew-cicd.DataBrewCodePipelineProps.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string
- *Default:* 'databrew-cicd-codepipelineartifactstorebucket'

The name of the S3 bucket for the CodePipeline DataBrew CICD pipeline.

---

##### `firstStageArtifactName`<sup>Optional</sup> <a name="firstStageArtifactName" id="cdk-databrew-cicd.DataBrewCodePipelineProps.property.firstStageArtifactName"></a>

```typescript
public readonly firstStageArtifactName: string;
```

- *Type:* string
- *Default:* 'SourceOutput'

the (required) name of the Artifact at the first stage.

---

##### `pipelineName`<sup>Optional</sup> <a name="pipelineName" id="cdk-databrew-cicd.DataBrewCodePipelineProps.property.pipelineName"></a>

```typescript
public readonly pipelineName: string;
```

- *Type:* string
- *Default:* 'DataBrew-Recipe-Application'

The name of the CodePipeline Databrew CICD pipeline.

---

##### `repoName`<sup>Optional</sup> <a name="repoName" id="cdk-databrew-cicd.DataBrewCodePipelineProps.property.repoName"></a>

```typescript
public readonly repoName: string;
```

- *Type:* string
- *Default:* 'DataBrew-Recipes-Repo'

The name of the CodeCommit repositroy for the DataBrew CICD pipeline.

---

### FirstCommitHandlerProps <a name="FirstCommitHandlerProps" id="cdk-databrew-cicd.FirstCommitHandlerProps"></a>

#### Initializer <a name="Initializer" id="cdk-databrew-cicd.FirstCommitHandlerProps.Initializer"></a>

```typescript
import { FirstCommitHandlerProps } from 'cdk-databrew-cicd'

const firstCommitHandlerProps: FirstCommitHandlerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandlerProps.property.branchName">branchName</a></code> | <code>string</code> | The branch name used in the CodeCommit repo. |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandlerProps.property.codeCommitRepoArn">codeCommitRepoArn</a></code> | <code>string</code> | The ARN of the CodeCommit repository. |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandlerProps.property.repoName">repoName</a></code> | <code>string</code> | The name of the CodeCommit repo. |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandlerProps.property.functionName">functionName</a></code> | <code>string</code> | The name of the Lambda function which deals with first commit via AWS CodeCommit. |
| <code><a href="#cdk-databrew-cicd.FirstCommitHandlerProps.property.roleName">roleName</a></code> | <code>string</code> | The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit. |

---

##### `branchName`<sup>Required</sup> <a name="branchName" id="cdk-databrew-cicd.FirstCommitHandlerProps.property.branchName"></a>

```typescript
public readonly branchName: string;
```

- *Type:* string

The branch name used in the CodeCommit repo.

---

##### `codeCommitRepoArn`<sup>Required</sup> <a name="codeCommitRepoArn" id="cdk-databrew-cicd.FirstCommitHandlerProps.property.codeCommitRepoArn"></a>

```typescript
public readonly codeCommitRepoArn: string;
```

- *Type:* string

The ARN of the CodeCommit repository.

---

##### `repoName`<sup>Required</sup> <a name="repoName" id="cdk-databrew-cicd.FirstCommitHandlerProps.property.repoName"></a>

```typescript
public readonly repoName: string;
```

- *Type:* string

The name of the CodeCommit repo.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="cdk-databrew-cicd.FirstCommitHandlerProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* 'FirstCommitHandler'

The name of the Lambda function which deals with first commit via AWS CodeCommit.

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="cdk-databrew-cicd.FirstCommitHandlerProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* 'LambdaForInitialCommitRole'

The name of the IAM role for the Lambda function which deals with first commit via AWS CodeCommit.

---

### IamRoleProps <a name="IamRoleProps" id="cdk-databrew-cicd.IamRoleProps"></a>

#### Initializer <a name="Initializer" id="cdk-databrew-cicd.IamRoleProps.Initializer"></a>

```typescript
import { IamRoleProps } from 'cdk-databrew-cicd'

const iamRoleProps: IamRoleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.IamRoleProps.property.accountID">accountID</a></code> | <code>string</code> | The ID of your infrastructure account. |
| <code><a href="#cdk-databrew-cicd.IamRoleProps.property.environment">environment</a></code> | <code>string</code> | 'preproduction' or 'production'. |
| <code><a href="#cdk-databrew-cicd.IamRoleProps.property.roleName">roleName</a></code> | <code>string</code> | The role name. |

---

##### `accountID`<sup>Required</sup> <a name="accountID" id="cdk-databrew-cicd.IamRoleProps.property.accountID"></a>

```typescript
public readonly accountID: string;
```

- *Type:* string

The ID of your infrastructure account.

---

##### `environment`<sup>Required</sup> <a name="environment" id="cdk-databrew-cicd.IamRoleProps.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

'preproduction' or 'production'.

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="cdk-databrew-cicd.IamRoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* '{environment}-Databrew-Cicd-Role'

The role name.

---

### InfraIamRoleProps <a name="InfraIamRoleProps" id="cdk-databrew-cicd.InfraIamRoleProps"></a>

#### Initializer <a name="Initializer" id="cdk-databrew-cicd.InfraIamRoleProps.Initializer"></a>

```typescript
import { InfraIamRoleProps } from 'cdk-databrew-cicd'

const infraIamRoleProps: InfraIamRoleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.InfraIamRoleProps.property.roleName">roleName</a></code> | <code>string</code> | The role name for the infrastructure account. |

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="cdk-databrew-cicd.InfraIamRoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* 'CrossAccountRepositoryContributorRole'

The role name for the infrastructure account.

---

### PreProductionLambdaProps <a name="PreProductionLambdaProps" id="cdk-databrew-cicd.PreProductionLambdaProps"></a>

#### Initializer <a name="Initializer" id="cdk-databrew-cicd.PreProductionLambdaProps.Initializer"></a>

```typescript
import { PreProductionLambdaProps } from 'cdk-databrew-cicd'

const preProductionLambdaProps: PreProductionLambdaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.PreProductionLambdaProps.property.bucketArn">bucketArn</a></code> | <code>string</code> | The ARN of the S3 bucket for the DataBrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.PreProductionLambdaProps.property.preproductionIamRoleArn">preproductionIamRoleArn</a></code> | <code>string</code> | The ARN of the IAM role in the pre-production account. |
| <code><a href="#cdk-databrew-cicd.PreProductionLambdaProps.property.functionName">functionName</a></code> | <code>string</code> | The Lambda funciton name for the pre-production account. |
| <code><a href="#cdk-databrew-cicd.PreProductionLambdaProps.property.roleName">roleName</a></code> | <code>string</code> | The name of the IAM role for the pre-produciton Lambda function. |

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="cdk-databrew-cicd.PreProductionLambdaProps.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

The ARN of the S3 bucket for the DataBrew CICD pipeline.

---

##### `preproductionIamRoleArn`<sup>Required</sup> <a name="preproductionIamRoleArn" id="cdk-databrew-cicd.PreProductionLambdaProps.property.preproductionIamRoleArn"></a>

```typescript
public readonly preproductionIamRoleArn: string;
```

- *Type:* string

The ARN of the IAM role in the pre-production account.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="cdk-databrew-cicd.PreProductionLambdaProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* 'PreProd-DataBrew-Recipe-Deployer'

The Lambda funciton name for the pre-production account.

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="cdk-databrew-cicd.PreProductionLambdaProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* 'PreProd-DataBrew-Recipe-Deployer-role'

The name of the IAM role for the pre-produciton Lambda function.

---

### ProductionLambdaProps <a name="ProductionLambdaProps" id="cdk-databrew-cicd.ProductionLambdaProps"></a>

#### Initializer <a name="Initializer" id="cdk-databrew-cicd.ProductionLambdaProps.Initializer"></a>

```typescript
import { ProductionLambdaProps } from 'cdk-databrew-cicd'

const productionLambdaProps: ProductionLambdaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-databrew-cicd.ProductionLambdaProps.property.bucketArn">bucketArn</a></code> | <code>string</code> | The ARN of the S3 bucket for the DataBrew CICD pipeline. |
| <code><a href="#cdk-databrew-cicd.ProductionLambdaProps.property.productionIamRoleArn">productionIamRoleArn</a></code> | <code>string</code> | The ARN of the IAM role in the production account. |
| <code><a href="#cdk-databrew-cicd.ProductionLambdaProps.property.functionName">functionName</a></code> | <code>string</code> | The Lambda funciton name for the production account. |
| <code><a href="#cdk-databrew-cicd.ProductionLambdaProps.property.roleName">roleName</a></code> | <code>string</code> | The name of the IAM role for the produciton Lambda function. |

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="cdk-databrew-cicd.ProductionLambdaProps.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

The ARN of the S3 bucket for the DataBrew CICD pipeline.

---

##### `productionIamRoleArn`<sup>Required</sup> <a name="productionIamRoleArn" id="cdk-databrew-cicd.ProductionLambdaProps.property.productionIamRoleArn"></a>

```typescript
public readonly productionIamRoleArn: string;
```

- *Type:* string

The ARN of the IAM role in the production account.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="cdk-databrew-cicd.ProductionLambdaProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* 'Prod-DataBrew-Recipe-Deployer'

The Lambda funciton name for the production account.

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="cdk-databrew-cicd.ProductionLambdaProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* 'Prod-DataBrew-Recipe-Deployer-role'

The name of the IAM role for the produciton Lambda function.

---



