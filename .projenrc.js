const { AwsCdkConstructLibrary, NpmAccess, ProjectType } = require('projen');
const { Mergify } = require('projen/lib/github');

const project = new AwsCdkConstructLibrary({
  author: 'scott.hsieh',
  authorName: 'Shu-Jeng Hsieh',
  authorAddress: 'https://fantasticsie.medium.com/',
  keywords: [
    'aws-cloudwatch',
    'aws-codecommit',
    'aws-codepipeline',
    'aws-databrew',
    'aws-lambda',
    'cicd',
    'serverless',
    'scott.hsieh',
  ],
  catalog: {
    twitter: 'fantasticHsieh',
  },

  cdkVersion: '1.106.1',
  defaultReleaseBranch: 'main',
  name: 'cdk-databrew-cicd',
  repositoryUrl: 'https://github.com/HsiehShuJeng/cdk-databrew-cicd.git',
  projectName: 'cdk-databrew-cicd',
  projectType: ProjectType.LIB,
  projenUpgradeSecret: 'PROJEN_UPGRADE_SECRET',

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-codecommit',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/custom-resources',
    '@aws-cdk/aws-s3',
  ],
  cdkAssert: true,
  cdkVersionPinning: false, // see https://www.matthewbonig.com/2021/04/06/automating-construct-publishing/
  devDeps: [
    'esbuild',
    'source-map-support',
  ],
  tsconfig: { include: ['src/**/*.ts', 'src/**.*.py'], compilerOptions: {} },


  npmAccess: NpmAccess.PUBLIC,

  mergify: false,
  docgen: true,
  eslint: true,
  dependabot: false,

  defaultReleaseBranch: 'main',

  // publish to npm
  releaseToNpm: true,
  releaseBranches: ['main'],
  releaseWorkflow: true,
  releaseEveryCommit: true, //will run the release GitHub Action on each push to the defined

  // publish to PyPi
  publishToPypi: {
    distName: 'cdk_databrew_cicd',
    module: 'cdk_databrew_cicd',
  },

  // publish to Maven
  publishToMaven: {
    mavenGroupId: 'io.github.hsiehshujeng',
    mavenArtifactId: 'cdk-databrew-cicd',
    javaPackage: 'io.github.hsiehshujeng.cdk.databrew.cicd',
    mavenEndpoint: 'https://s01.oss.sonatype.org', // check https://central.sonatype.org/publish/release/#login-into-ossrh
  },

  // publish to dotnet
  publishToNuget: {
    dotNetNamespace: 'ScottHsieh.Cdk',
    packageId: 'Databrew.Cicd',
  },
});

project.eslint.addOverride({
  files: ['*.ts'],
  rules: { '@typescript-eslint/no-require-imports': 0 },
});

const mergifyRules = [
  {
    name: 'Automatic merge on approval and successful build',
    actions: {
      merge: {
        method: 'squash',
        commit_message: 'title+body',
        strict: 'smart',
        strict_method: 'merge',
      },
      delete_head_branch: {},
    },
    conditions: [
      '#approved-reviews-by>=1',
      'status-success=build',
      '-title~=(WIP|wip)',
      '-label~=(blocked|do-not-merge)',
    ],
  },
  {
    name: 'Automatic merge PRs with auto-merge label upon successful build',
    actions: {
      merge: {
        method: 'squash',
        commit_message: 'title+body',
        strict: 'smart',
        strict_method: 'merge',
      },
      delete_head_branch: {},
    },
    conditions: [
      'label=auto-merge',
      'status-success=build',
      '-title~=(WIP|wip)',
      '-label~=(blocked|do-not-merge)',
    ],
  },
];

new Mergify(project.github, {
  rules: mergifyRules,
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
const commonExclusions = ['cdk.context.json', 'yarn-error.log', 'cdk.out', '.cdk.staging'];
project.npmignore.exclude(...commonExclusions);
project.gitignore.exclude(...commonExclusions);
project.npmignore.exclude(...mavenExclusions);
project.gitignore.exclude(...mavenExclusions);
project.npmignore.exclude(...pythonDemoExclustions);
project.gitignore.exclude(...pythonDemoExclustions);
project.npmignore.exclude(...javaDemoExclustions);
project.gitignore.exclude(...javaDemoExclustions);
project.synth();