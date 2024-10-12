import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";

export class adminBackendStack extends cdk.Stack {
	public readonly mainTable: dynamodb.TableV2;
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
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
	}
}
