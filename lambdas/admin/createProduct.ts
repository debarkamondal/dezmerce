import { dbService } from "/opt/nodejs/db";
import { s3Service } from "/opt/nodejs/s3";
import {
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2,
	Handler,
} from "aws-lambda";
import { productSchema } from "/opt/nodejs/schemas";
import { z } from "zod";
import { renameImages } from "/opt/nodejs/utils";

type presignedUrls = {
	thumbnail: string;
	images: { [imageNage: string]: string };
};

export const addProduct = async (product: z.infer<typeof productSchema>) => {
	let imageUrls: string[] | string = [""];
	let thumbnailUrl: string = "";
	try {
		const s3Client = new s3Service();
		const { images, thumbnail } = renameImages(
			product.productId,
			product.images,
			product.thumbnail
		);

		const res = await dbService.createProduct({
			...product,
			images,
			thumbnail,
		}); // Creating product in dynamoDB (PutItem)
		if (!("$metadata" in res)) throw new Error(res.message);
		if (res.$metadata.httpStatusCode !== 200) {
			throw new Error("DB error");
		}

		// Fetching pre-signed URLs for the thumbnail
		if (res.images && res.thumbnail) {
			await dbService.updateCategoryCount(product.category, true);
			imageUrls = await s3Client.getpresignedUrl(res.images);
			thumbnailUrl = (await s3Client.getpresignedUrl([res.thumbnail]))[0];
			console.log(thumbnailUrl);
		}

		// Creating return object with presigned urls of the thumbnail and the other images
		let presignedUrls: presignedUrls = { thumbnail: thumbnailUrl, images: {} };
		if (imageUrls) {
			for (let i = 0; i < res.images.length; i++) {
				presignedUrls.images[product.images[i]] = imageUrls[i];
			}
		}
		return {
			statusCode: 200,
			body: {
				...presignedUrls,
				productId: product.productId,
				category: res.category,
			},
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: { status: "error", message: error.message },
		};
	}
};
export const handler: Handler = async (
	event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
	let statusCode = 200;
	const headers = {
		"Content-Type": "application/json",
	};
	const productId = Date.now();

	let body = JSON.parse(event.body as string);

	body.productId = productId;
	body.updatedAt = productId;

	try {
		const product = productSchema.parse(body);
		({ body, statusCode } = await addProduct(product));
	} catch (error: any) {
		statusCode = 500;
		if (error instanceof z.ZodError) body = error;
		else body = { status: "error", message: error.message };
	}

	return {
		statusCode,
		body: JSON.stringify(body), // Returning presigned urls of the thumbnail and the other images as the response body.
		headers,
	};
};
