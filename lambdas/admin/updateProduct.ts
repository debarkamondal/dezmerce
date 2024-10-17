import {
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2,
	Handler,
} from "aws-lambda";
import { delProduct } from "./deleteProduct";
import { addProduct } from "./createProduct";
import { productSchema } from "/opt/nodejs/schemas";
import { z } from "zod";

// export default async function updateProduct(
// 	newProduct: productType,
// 	id: string
// ): Promise<{ body: {}; statusCode: number }> {
export const update: Handler = async (
	event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	let statusCode = 200;
	const headers = {
		"Content-Type": "application/json",
	};
	let body: any = {};
	try {
		// If identifiers(indices) are updated, delete the old product and create a new one.
		const id = event.pathParameters!.id as string;
		body = JSON.parse(event.body as string);
		const category = decodeURI(id.split(":")[0]);
		const productId = parseInt(decodeURI(id.split(":")[1]));
		body.updatedAt = Date.now();
		body.productId = productId;

		body = productSchema.parse(body);

		const deleteResult = await delProduct(category, productId);
		if (deleteResult.statusCode !== 200)
			throw new Error("Product deletion failed");
		const createResult = await addProduct(body);
		if (createResult.statusCode !== 200)
			throw new Error("Product creation failed");
		({ body, statusCode } = createResult);
	} catch (error: any) {
		statusCode = 500;
		if (error instanceof z.ZodError) body = error;
		else body = { status: "error", message: error.message };
	}
	return {
		statusCode,
		body: JSON.stringify(body),
		headers,
	};
};
