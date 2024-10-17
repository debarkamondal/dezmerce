import {
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2,
	Handler,
} from "aws-lambda";
import { dbService } from "/opt/nodejs/db";
import { s3Service } from "/opt/nodejs/s3";

export const delProduct = async (category: string, productId: number) => {
	const s3Client = new s3Service();
	try {
		const res = await dbService.deleteProduct(category, productId);
		if ("status" in res && res.status === "error") throw new Error("DB error");
		if (!("$metadata" in res) || res.$metadata.httpStatusCode !== 200)
			throw new Error("DB error");
		await dbService.updateCategoryCount(category, false);
		const s3res = await s3Client.deleteImages(`products/${productId}`);
		if (s3res.status === "S3Error") throw new Error(s3res.message);

		return {
			statusCode: 200,
			body: { status: "success", message: "Successfully deleted product" },
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: { status: "S3Error", message: error.message },
		};
	}
};

export const handler: Handler = async (
	event?: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	let statusCode = 200;
	const headers = {
		"Content-Type": "application/json",
	};
	let body = {};

	const id = event?.pathParameters?.id as string;
	const category = decodeURI(id.split(":")[0]);
	const productId = parseInt(decodeURI(id.split(":")[1]));
	({ statusCode, body } = await delProduct(category, productId));
	return {
		body: JSON.stringify(body),
		statusCode,
		headers,
	};
};
