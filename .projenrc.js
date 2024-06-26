const projen = require('projen');

const project = new projen.awscdk.AwsCdkConstructLibrary({
  author: 'scott.hsieh',
  authorName: 'Shu-Jeng Hsieh',
  authorAddress: 'https://fantasticsie.medium.com/',
  description: 'A construct for AWS Glue DataBrew wtih CICD',
  keywords: [
    'aws',
    'cdk',
    'cloudwatch',
    'codecommit',
    'codepipeline',
    'databrew',
    'lambda',
    'cicd',
    'serverless',
    'scott.hsieh',
  ],
  catalog: {
    announce: true,
    twitter: 'fantasticHsieh',
  },

  cdkVersion: '2.27.0',
  defaultReleaseBranch: 'main',
  majorVersion: 2,
  name: 'cdk-databrew-cicd',
  repositoryUrl: 'https://github.com/HsiehShuJeng/cdk-databrew-cicd.git',
  deps: [
    'aws-cdk-lib',
    'constructs@^10.0.5',
  ],
  devDeps: [
    'aws-cdk-lib',
    'constructs@^10.0.5',
    'esbuild',
    'source-map-support',
  ],
  jsiiVersion: '5.4.x',
  peerDeps: [
    'aws-cdk-lib',
    'constructs@^10.0.5',
  ],
  eslint: true,
  dependabotOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
    },
  },
  autoApproveUpgrades: true,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['HsiehShuJeng'],
  },
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cdk_databrew_cicd',
    module: 'cdk_databrew_cicd',
  },
  publishToMaven: {
    mavenGroupId: 'io.github.hsiehshujeng',
    mavenArtifactId: 'cdk-databrew-cicd',
    javaPackage: 'io.github.hsiehshujeng.cdk.databrew.cicd',
    mavenEndpoint: 'https://s01.oss.sonatype.org', // check https://central.sonatype.org/publish/release/#login-into-ossrh
  },
  publishToNuget: {
    dotNetNamespace: 'ScottHsieh.Cdk',
    packageId: 'Databrew.Cicd',
  },
  publishToGo: {
    moduleName: 'github.com/HsiehShuJeng/cdk-databrew-cicd-go',
  },
  depsUpgradeOptions: {
    exclude: ['yaml'],
  },
});

project.eslint.addOverride({
  files: ['*.ts'],
  rules: { '@typescript-eslint/no-require-imports': 0 },
});

const mavenExclusions = ['public.pem', 'private.pem'];
const pythonDemoExclustions = [
  '*.swp',
  'package-lock.json',
  '__pycache__',
  '.pytest_cache',
  '.env',
  '.venv',
  '*.egg-info',
];
const javaDemoExclustions = [
  '.classpath.txt',
  'target/',
  '.classpath',
  '.project',
  '.idea',
  '.settings',
  '.vscode/',
  '*.iml',
];
const commonExclusions = ['cdk.context.json', 'yarn-error.log', 'cdk.out', '.cdk.staging', '.DS_Store'];
const exclusionLists = [
  commonExclusions,
  mavenExclusions,
  pythonDemoExclustions,
  javaDemoExclustions,
];
excludeFilesFrom(project, exclusionLists);
project.synth();

/**
 * Exclude files from the project's .npmignore and .gitignore.
 *
 * @param {Object} pjObject - The project object to apply the exclusions.
 * @param {Array<Array<string>>} exclusionList - An array of arrays, where each inner array contains a list of file patterns to exclude.
 */
function excludeFilesFrom(pjObject, exclusionList) {
  for (const exclusions of exclusionList) {
    pjObject.npmignore.exclude(...exclusions);
    pjObject.gitignore.exclude(...exclusions);
  }
}