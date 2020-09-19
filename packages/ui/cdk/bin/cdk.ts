#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DonationAppFrontend } from '../lib/donation-app-frontend';

const app = new cdk.App();
new DonationAppFrontend(app, 'DonationAppFrontend');
