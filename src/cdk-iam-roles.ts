import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface IamRoleProps {
  /**
     * 'preproduction' or 'production'
     */
  readonly environment: string;
  /**
     * The ID of your infrastructure account
     */
  readonly accountID: string;
  /**
     * The role name.
     *
     * @default '{environment}-Databrew-Cicd-Role'
     */
  readonly roleName?: string;
}
/**
 * IAM Role.
 *
 * Defines an IAM role for pre-production and production AWS accounts.
 */
export class IamRole extends cdk.Construct {
  /**
     * The ARN of the IAM role for pre-production or production.
     */
  readonly roleArn: string;
  constructor(scope: cdk.Construct, name: string, props: IamRoleProps) {
    super(scope, name);

    if (props.environment !== 'preproduction' && props.environment !== 'production') {
      throw new Error('The value of `environment` should be either \'production\' or \'preproduction\'');
    }

    const role = new iam.Role(this, `${props.environment}IamRole`, {
      assumedBy: new iam.AccountPrincipal(props.accountID),
      roleName: props.roleName ?? `${props.environment}-Databrew-Cicd-Role`,
      description: `The IAM role for DataBrew CICD in the ${props.environment} account.`,
    });
    role.addToPolicy(new iam.PolicyStatement({
      sid: 'DataBrewPermissions',
      effect: iam.Effect.ALLOW,
      actions: [
        'databrew:ListRecipes',
        'databrew:CreateRecipe',
        'databrew:PublishRecipe',
        'databrew:UpdateRecipe',
      ],
      resources: ['*'],
    }));
    this.roleArn = role.roleArn;
  }
}