import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand,
	GetCommandInput,
	GetCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import {
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2,
	Handler,
} from "aws-lambda";
import { z } from "zod";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const credentialValidator = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const handler: Handler = async (
	event?: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	let body = {};
	let statusCode = 200;
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	const client = new DynamoDBClient({});
	const dynamo = DynamoDBDocumentClient.from(client);
	const tableName = process.env.DYNAMODB_TABLE_NAME as string;
	const JWTSecret = process.env.JWT_SECRET as string;
	try {
		const creadentials = JSON.parse(event?.body as string);
		const verifiedCredentials = credentialValidator.parse(creadentials);
		const params: GetCommandInput = {
			TableName: tableName,
			Key: {
				category: verifiedCredentials.email,
				productId: 0,
			},
		};
		const res: GetCommandOutput = await dynamo.send(new GetCommand(params));
		if (!res.Item) throw new Error("User doesn't exist");
		const isAuthorized = await compare(
			creadentials.password,
			res.Item.passwordHash
		);
		if (isAuthorized) {
			const token = sign({ email: res.Item.category }, JWTSecret, {
				expiresIn: 60 * 60,
			});
			body = {
				email: res.Item.email,
				name: res.Item.name,
			};
			headers[
				"Set-Cookie"
			] = `accessToken=${token}; Secure; HttpOnly; Domain=.${
				process.env.DOMAIN_NAME
			}; Path=/; SameSite=None; Max-Age=${60 * 60}`;
		} else throw new Error("Invalid credentials");
	} catch (error: any) {
		statusCode = 500;
		if (error instanceof z.ZodError) body = error;
		else body = { status: "error", message: error.message };
	}
	return {
		body: JSON.stringify(body),
		statusCode,
		headers,
	};
};
