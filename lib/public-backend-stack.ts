import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import {
	S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY,
	S3_URL,
	S3_BUCKET_NAME,
} from "../config.json";

interface publicBackendStackProps extends cdk.StackProps {
	mainTable: dynamodb.TableV2;
}
export class publicBackendStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: publicBackendStackProps) {
		super(scope, id, props);
		const publicLambdaRole = new iam.Role(this, "publicLambdaRole", {
			roleName: "Dezmerce-public-lambda-role",
			assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
			inlinePolicies: {
				publicDynamoDBPolicy: new iam.PolicyDocument({
					statements: [
						new iam.PolicyStatement({
							actions: ["dynamodb:GetItem"],
							resources: [props.mainTable.tableArn],
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
			code: lambda.Code.fromAsset("lambdas/bin/public"),
			environment: {
				DYNAMODB_TABLE_NAME: props.mainTable.tableName,
				S3_ACCESS_KEY_ID,
				S3_SECRET_ACCESS_KEY,
				S3_URL,
				S3_BUCKET_NAME,
			},
			role: publicLambdaRole,
		};

		const publicLambdas = {
			getProductById: new lambda.Function(this, "getProductByIdLambda", {
				...lambdaParams,
				handler: "getProductById.handler",
				functionName: "getProductById",
			}),
		};

		const publicApi = new apigwv2.HttpApi(this, "Dezmerce-backend-public");
		publicApi.addRoutes({
			path: "/getProductById/{id}",
			methods: [apigwv2.HttpMethod.GET],
			integration: new HttpLambdaIntegration(
				"getProductByIdIntegration",
				publicLambdas.getProductById
			),
		});

		new cdk.CfnOutput(this, "public gateway", {
			value: publicApi.apiEndpoint,
		});
	}
}
