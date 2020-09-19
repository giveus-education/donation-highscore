import * as cdk from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';

export class DonationAppFrontend extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SPADeploy(this, 'spaDeploy').createBasicSite({indexDoc: 'index.html', websiteFolder: '../app/build'});

    // The code that defines your stack goes here
  }
}
