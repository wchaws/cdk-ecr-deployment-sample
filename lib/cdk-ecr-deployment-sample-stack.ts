import * as path from 'path';
import * as ecr from '@aws-cdk/aws-ecr';
import * as cdk from '@aws-cdk/core';
import * as ecrDeploy from 'cdk-ecr-deployment';
import { RemovalPolicy } from '@aws-cdk/core';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';

export class CdkEcrDeploymentSampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const repo = new ecr.Repository(this, 'NginxRepo', {
      repositoryName: 'nginx',
      removalPolicy: RemovalPolicy.DESTROY,
    });
    const image = new DockerImageAsset(this, 'CDKDockerImage', {
      directory: path.join(__dirname, 'docker'),
    });

    new ecrDeploy.ECRDeployment(this, 'DeployDockerImage', {
      src: new ecrDeploy.DockerImageName(image.imageUri),
      dest: new ecrDeploy.DockerImageName(`${repo.repositoryUri}:latest`),
    });
    // The code that defines your stack goes here
  }
}
