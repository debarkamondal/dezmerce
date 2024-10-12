#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { publicBackendStack } from "../lib/public-backend-stack";
import { adminBackendStack } from "../lib/admin-backend-stack";
const app = new cdk.App();
const adminBackend = new adminBackendStack(
	app,
	"DezmerceAdminBackendStack",
	{}
);
new publicBackendStack(app, "DezmercePublicBackendStack", {
	mainTable: adminBackend.mainTable,
});
