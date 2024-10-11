import { Handler } from "aws-cdk-lib/aws-lambda";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand,
	GetCommandInput,
	GetCommandOutput,
} from "@aws-sdk/lib-dynamodb";
export const getEntry: Handler = async (
	event?: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	const client = new DynamoDBClient();
	const dynamo = DynamoDBDocumentClient.from(client);
	let res: GetCommandOutput;
	const params: GetCommandInput = {
		TableName: process.env.DYNAMODB_TABLE_NAME,
		Key: {
			category: "test",
			productId: 1,
		},
	};
	try {
		res = await dynamo.send(new GetCommand(params));
		if (!res.Item) throw new Error("Couldn't get product from database");
	} catch (error: any) {
		return {
			statusCode: 400,
			body: error.message,
		};
	}
	return {
		statusCode: 200,
		body: JSON.stringify({
			category: res.Item.category,
			productId: res.Item.productId,
		}),
	};
};
