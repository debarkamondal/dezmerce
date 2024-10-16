import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import {
	HttpLambdaAuthorizer,
	HttpLambdaResponseType,
} from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import * as iam from "aws-cdk-lib/aws-iam";

import {
	S3_ACCESS_KEY_ID,
	S3_URL,
	S3_SECRET_ACCESS_KEY,
	S3_BUCKET_NAME,
	JWT_SECRET,
	DOMAIN_NAME,
} from "../config.json";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class adminBackendStack extends cdk.Stack {
	public readonly mainTable: dynamodb.TableV2; // Declaring table as public for cross-stack referencing.
	constructor(scope: Construct, id: string, props: cdk.StackProps) {
		super(scope, id, props);

		this.mainTable = new dynamodb.TableV2(this, "mainTable", {
			partitionKey: { name: "category", type: dynamodb.AttributeType.STRING },
			tableName: "Dezmerce-mainTable",
			sortKey: { name: "productId", type: dynamodb.AttributeType.NUMBER },
			localSecondaryIndexes: [
				{
					indexName: "genderIndex",
					sortKey: { name: "gender", type: dynamodb.AttributeType.STRING },
					projectionType: dynamodb.ProjectionType.INCLUDE,
					nonKeyAttributes: ["thumbnail", "price", "title"],
				},
			],
			billing: dynamodb.Billing.onDemand(),
		});

		const adminLambdaRole = new iam.Role(this, "adminLambdaRole", {
			roleName: "Dezmerce-admin-lambda-role",
			assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
			inlinePolicies: {
				publicDynamoDBPolicy: new iam.PolicyDocument({
					statements: [
						new iam.PolicyStatement({
							actions: [
								"dynamodb:GetItem",
								"dynamodb:PutItem",
								"dynamodb:DeleteItem",
							],
							resources: [this.mainTable.tableArn],
						}),
						new iam.PolicyStatement({
							effect: iam.Effect.ALLOW,
							actions: [
								"logs:CreateLogGroup",
								"logs:CreateLogStream",
								"logs:PutLogEvents",
								"logs:DescribeLogStreams",
								"cloudwatch:PutMetricData",
							],
							resources: ["*"],
						}),
					],
				}),
			},
		});
		const lambdaParams = {
			runtime: lambda.Runtime.NODEJS_20_X,
			code: lambda.Code.fromAsset("lambdas/bin/admin"),
			environment: {
				DYNAMODB_TABLE_NAME: this.mainTable.tableName,
				S3_ACCESS_KEY_ID,
				S3_SECRET_ACCESS_KEY,
				S3_URL,
				S3_BUCKET_NAME,
			},
			role: adminLambdaRole,
		};
		const adminLambdas = {
			createProduct: new lambda.Function(this, "createProductLambda", {
				...lambdaParams,
				handler: "createProduct.handler",
				functionName: "createProduct",
			}),
			deleteProduct: new lambda.Function(this, "deleteProductLambda", {
				...lambdaParams,
				handler: "deleteProduct.handler",
				functionName: "deleteProduct",
			}),
			updateProduct: new lambda.Function(this, "updateProductLambda", {
				...lambdaParams,
				handler: "updateProduct.handler",
				functionName: "updateProduct",
			}),
			lambdaAuthorizer: new lambda.Function(this, "adminAuthorizer", {
				runtime: lambda.Runtime.NODEJS_20_X,
				code: lambda.Code.fromAsset("lambdas/bin/admin"),
				environment: { JWT_SECRET },
				handler: "authorizer.handler",
				functionName: "adminAuthorizer",
			}),
			login: new lambda.Function(this, "loginLambda", {
				...lambdaParams,
				environment: { ...lambdaParams.environment, JWT_SECRET, DOMAIN_NAME },
				handler: "login.handler",
				functionName: "loginLambda",
			}),
		};

		const authorizer = new HttpLambdaAuthorizer(
			"AdminAuthorizer",
			adminLambdas.lambdaAuthorizer,
			{
				responseTypes: [HttpLambdaResponseType.SIMPLE],
				resultsCacheTtl: cdk.Duration.seconds(0),
				authorizerName: "AdminAuthorizer",
				identitySource: ["$request.header.Cookie"],
			}
		);

		const adminApi = new apigwv2.HttpApi(this, "Dezmerce-backend-admin");
		adminApi.addRoutes({
			path: "/createProduct",
			methods: [apigwv2.HttpMethod.POST],
			integration: new HttpLambdaIntegration(
				"createProductIntegration",
				adminLambdas.createProduct
			),
			authorizer,
		});
		adminApi.addRoutes({
			path: "/deleteProduct/{id}",
			methods: [apigwv2.HttpMethod.DELETE],
			integration: new HttpLambdaIntegration(
				"deleteProductIntegration",
				adminLambdas.deleteProduct
			),
			authorizer,
		});
		adminApi.addRoutes({
			path: "/login",
			methods: [apigwv2.HttpMethod.POST],
			integration: new HttpLambdaIntegration(
				"loginLambdaIntegration",
				adminLambdas.login
			),
		});
		new cdk.CfnOutput(this, "admin gateway", {
			value: adminApi.apiEndpoint,
		});
	}
}
