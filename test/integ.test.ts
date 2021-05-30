import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';

test('IamRole', () => {
  const app = new cdk.App();
  const infraStack = new cdk.Stack(app, 'infra-stack');



  expect(SynthUtils.toCloudFormation(infraStack)).toMatchSnapshot();
})