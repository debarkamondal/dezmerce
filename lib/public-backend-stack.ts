import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";

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
					],
				}),
			},
		});

		const lambdaParams = {
			runtime: lambda.Runtime.NODEJS_20_X,
			code: lambda.Code.fromAsset("lambdas/bin/public"),
			environment: {
				DYNAMODB_TABLE_NAME: props.mainTable.tableName,
			},
			role: publicLambdaRole,
		};

		const publicLambdas = {
			getProductById: new lambda.Function(this, "get entry function", {
				...lambdaParams,
				handler: "getProductById.handler",
			}),
		};

		const HttpApi = new apigwv2.HttpApi(this, "Dezmerce-backend-public");
		HttpApi.addRoutes({
			path: "/getProductById/{id}",
			methods: [apigwv2.HttpMethod.GET],
			integration: new HttpLambdaIntegration(
				"getProductByIdIntegration",
				publicLambdas.getProductById
			),
		});

		new cdk.CfnOutput(this, "public gateway", {
			value: HttpApi.apiEndpoint,
		});
	}
}
