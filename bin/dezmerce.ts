#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { publicBackendStack } from "../lib/public-backend-stack";
import { adminBackendStack } from "../lib/admin-backend-stack";
import { AWS_DEFAULT_REGION } from "../config.json";
const app = new cdk.App();
const adminBackend = new adminBackendStack(app, "DezmerceAdminBackendStack", {
	env: {
		region: process.env.AWS_DEFAULT_REGION || AWS_DEFAULT_REGION,
	},
});
new publicBackendStack(app, "DezmercePublicBackendStack", {
	mainTable: adminBackend.mainTable,
	env: {
		region: process.env.AWS_DEFAULT_REGION || AWS_DEFAULT_REGION,
	},
});
