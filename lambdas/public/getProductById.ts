import { Handler } from "aws-cdk-lib/aws-lambda";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand,
	GetCommandInput,
	GetCommandOutput,
} from "@aws-sdk/lib-dynamodb";
export const handler: Handler = async (
	event?: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	const client = new DynamoDBClient();
	const dynamo = DynamoDBDocumentClient.from(client);
	let body = {};
	let statusCode = 200;
	let headers = { "Content-Type": "application/json" };
	const id = event?.pathParameters!.id as string;
	const category = id.split(":")[0];
	const productId = parseInt(id.split(":")[1]);
	let res: GetCommandOutput;
	const params: GetCommandInput = {
		TableName: process.env.DYNAMODB_TABLE_NAME,
		Key: {
			category,
			productId,
		},
	};
	try {
		res = await dynamo.send(new GetCommand(params));
		if (!res.Item) throw new Error("Couldn't get product from database");
	} catch (error: any) {
		statusCode = 400;
		body = error.message;
	}
	return {
		statusCode,
		body: JSON.stringify(res!.Item),
		headers,
	};
};
