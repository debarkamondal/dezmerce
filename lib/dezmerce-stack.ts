import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
export class DezmerceStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		//Creating DynamoDB table
		const mainTable = new dynamodb.TableV2(this, "main table", {
			partitionKey: { name: "category", type: dynamodb.AttributeType.STRING },
			tableName: "mainTable",
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

		const userLambdaRole = new iam.Role(this, "userLambdaRole", {
			assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
			inlinePolicies: {
				userDynamoDBPolicy: new iam.PolicyDocument({
					statements: [
						new iam.PolicyStatement({
							actions: ["dynamodb:GetItem"],
							resources: [mainTable.tableArn],
						}),
					],
				}),
			},
		});

		const getEntryFunc = new lambda.Function(this, "get entry function", {
			runtime: lambda.Runtime.NODEJS_20_X,
			handler: "getEntry.getEntry",
			code: lambda.Code.fromAsset("lambdas/bin"),
			environment: {
				DYNAMODB_TABLE_NAME: mainTable.tableName,
			},
			role: userLambdaRole,
		});

		const getEntryIntegration = new HttpLambdaIntegration(
			"getEntryIntegration",
			getEntryFunc
		);
		const HttpApi = new apigwv2.HttpApi(this, "dezmerce-backend-admin");
		HttpApi.addRoutes({
			path: "/getEntry",
			methods: [apigwv2.HttpMethod.GET],
			integration: getEntryIntegration,
		});
		// new apigwv2.HttpStage(this, "default stage", {
		// 	httpApi: HttpApi,
		// 	stageName: "default",
		// 	description: "defaulst stage for backend admins",
		// });
		new cdk.CfnOutput(this, "api gateway", {
			value: HttpApi.apiEndpoint,
		});
	}
}
