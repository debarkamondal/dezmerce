import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
	DynamoDBDocumentClient,
	DeleteCommand,
	GetCommand,
	PutCommand,
	QueryCommand,
	UpdateCommand,
	BatchWriteCommand,
	type DeleteCommandOutput,
	type GetCommandInput,
	type PutCommandOutput,
	type QueryCommandInput,
	type GetCommandOutput,
	type QueryCommandOutput,
	type UpdateCommandInput,
	type UpdateCommandOutput,
	type DeleteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import type { productType, statusType } from "./types";
import { productSchema } from "./schemas";
import { z } from "zod";

interface dbRes extends PutCommandOutput {
	images: string[];
	thumbnail: string;
	productId: number;
	category: string;
}
export class dbService {
	static client = new DynamoDBClient({});
	static dynamo = DynamoDBDocumentClient.from(this.client);
	static tableName = process.env.DYNAMODB_TABLE_NAME as string;

	public static async createProduct(
		Item: z.infer<typeof productSchema>
	): Promise<dbRes | statusType> {
		const params: { TableName: string; Item: z.infer<typeof productSchema> } = {
			TableName: this.tableName,
			Item,
		};
		try {
			const res: PutCommandOutput = await this.dynamo.send(
				new PutCommand(params)
			);
			return {
				...res,
				thumbnail: params.Item.thumbnail,
				images: params.Item.images,
				productId: params.Item.productId,
				category: params.Item.category,
			};
		} catch (error) {
			return { status: "DBerror", message: "Couldn't add product to database" };
		}
	}
	public static async deleteProduct(
		category: string,
		productId: number
	): Promise<DeleteCommandOutput | statusType> {
		const params: DeleteCommandInput = {
			TableName: this.tableName,
			Key: {
				category,
				productId,
			},
		};
		try {
			const res = await this.dynamo.send(new DeleteCommand(params));
			return res;
		} catch (error) {
			return {
				status: "DBerror",
				message: "Couldn't delete product from database",
			};
		}
	}

	public static async updateProduct(
		pk: string,
		sk: string,
		product: productType
	) {
		let UpdateExpression: string | string[] = [];
		let ExpressionAttributeValues: {
			[key: string]: string | string[] | number;
		} = {};
		for (let key in product) {
			const value = product[key as keyof productType];

			UpdateExpression.push(`${key} = :${key}`);
			ExpressionAttributeValues[`:${key}`] = value;
		}
		UpdateExpression = "set " + UpdateExpression.join(", ");

		const params: UpdateCommandInput = {
			TableName: this.tableName,
			Key: {
				category: pk,
				productId: sk,
			},
			UpdateExpression,
			ExpressionAttributeValues,
			ReturnValues: "ALL_NEW",
		};
		try {
			const res: UpdateCommandOutput = await this.dynamo.send(
				new UpdateCommand(params)
			);
			if (res.$metadata.httpStatusCode !== 200)
				throw new Error("Couldn't update product in database");
			return res;
		} catch (error: any) {
			return {
				error: "Couldn't update product in database",
				message: error.message,
			};
		}
	}
	public static async getProductById(
		category: string,
		productId: number
	): Promise<GetCommandOutput | statusType> {
		const params: GetCommandInput = {
			TableName: this.tableName,
			Key: {
				category,
				productId,
			},
		};
		try {
			const res: GetCommandOutput = await this.dynamo.send(
				new GetCommand(params)
			);
			if (!res.Item) throw new Error("Couldn't get product from database");

			return res;
		} catch (error: any) {
			return {
				status: "DBerror",
				message: error.message,
			};
		}
	}
	public static async getProductsByGender({
		pageSize = 10,
		...inputs
	}: {
		category: string;
		gender: string;
		pageSize: number;
		ExclusiveStartKey?: Record<string, any>;
	}): Promise<QueryCommandOutput | statusType> {
		let params: QueryCommandInput = {
			TableName: this.tableName,
			IndexName: "genderIndex",
			KeyConditionExpression: "category= :category",
			// FilterExpression: "gender = :gender",
			ExpressionAttributeValues: {
				":category": inputs.category,
			},
			Limit: pageSize,
		};
		if (inputs.gender) {
			params.KeyConditionExpression = params.KeyConditionExpression?.concat(
				" ",
				"AND gender= :gender"
			);
			params.ExpressionAttributeValues = {
				...params.ExpressionAttributeValues,
				":gender": inputs.gender,
			};
		}
		inputs.ExclusiveStartKey &&
			(params.ExclusiveStartKey = inputs.ExclusiveStartKey);
		try {
			const res: QueryCommandOutput = await this.dynamo.send(
				new QueryCommand(params)
			);
			// if (!res.Items) throw new Error("Couldn't get product from database");
			return res;
		} catch (error: any) {
			return {
				status: "DBerror",
				message: error.message,
			};
		}
	}
	public static getAllCategories = async (): Promise<
		GetCommandOutput | statusType
	> => {
		const params: GetCommandInput = {
			TableName: this.tableName,
			Key: {
				category: "allCategories",
				productId: 0,
			},
		};
		try {
			const res: GetCommandOutput = await this.dynamo.send(
				new GetCommand(params)
			);
			if (!res.Item) throw new Error("Couldn't get product from database");
			return res;
		} catch (error: any) {
			return { status: "DBerror", message: error.message };
		}
	};
	public static updateCategory = async (
		category: string,
		count?: number
	): Promise<UpdateCommandOutput | statusType> => {
		const params: UpdateCommandInput = {
			TableName: this.tableName,
			Key: {
				category: "allCategories",
				productId: 0,
			},
			UpdateExpression: "set #category= :count",
			ExpressionAttributeNames: {
				"#category": category,
			},
			ExpressionAttributeValues: {
				":count": 0,
			},
			ReturnValues: "UPDATED_NEW",
		};
		try {
			const res: UpdateCommandOutput = await this.dynamo.send(
				new UpdateCommand(params)
			);
			if (!res.Attributes) throw new Error("Couldn't add category to database");
			return res;
		} catch (error: any) {
			return { status: "DBerror", message: error.message };
		}
	};
	public static updateCategoryCount = async (
		category: string,
		increase?: boolean
	): Promise<UpdateCommandOutput | statusType> => {
		try {
			const categoryCount = await this.getAllCategories();
			if (!("$metadata" in categoryCount) || !categoryCount.Item)
				throw new Error("Couldn't fetch all categories");
			const params: UpdateCommandInput = {
				TableName: this.tableName,
				Key: {
					category: "allCategories",
					productId: 0,
				},
				UpdateExpression: "set #category= :count",
				ExpressionAttributeNames: {
					"#category": category,
				},
				ExpressionAttributeValues: {
					":count": increase
						? ++categoryCount.Item[category]
						: --categoryCount.Item[category],
				},
				ReturnValues: "UPDATED_NEW",
			};
			const res: UpdateCommandOutput = await this.dynamo.send(
				new UpdateCommand(params)
			);
			if (!res.Attributes)
				throw new Error("Couldn't change category count to database");
			return res;
		} catch (error: any) {
			return { status: "DBerror", message: error.message };
		}
	};
	public static deleteCategory = async (
		category: string,
		LastEvaluatedKey?: Record<string, any>
	) => {
		try {
			let params: QueryCommandInput = {
				TableName: this.tableName,
				KeyConditionExpression: "category= :category",
				ExpressionAttributeValues: {
					":category": category,
				},
			};
			LastEvaluatedKey ? (params.ExclusiveStartKey = LastEvaluatedKey) : null;
			const queryRes: QueryCommandOutput = await this.dynamo.send(
				new QueryCommand(params)
			);
			if (queryRes.$metadata.httpStatusCode !== 200) throw new Error("DBerror");
			let items: Object[] = [];
			let images: String[] = [];
			do {
				if (items.length === 25) {
					await this.dynamo.send(
						new BatchWriteCommand({
							RequestItems: {
								[this.tableName]: items,
							},
						})
					);
					items = [];
				}
				if (!queryRes.Items)
					return { status: "Error", message: "No items found" };
				for (const item of queryRes.Items) {
					items.push({
						DeleteRequest: { Key: { category, productId: item.productId } },
					});
					if (!item.images) continue;
					images.push(`products/${item.thumbnail}`);
					images = images.concat(
						item.images?.map((image: string) => `products/${image}`)
					);
				}
			} while (queryRes.LastEvaluatedKey);
			await this.dynamo.send(
				new BatchWriteCommand({
					RequestItems: {
						[this.tableName]: items,
					},
				})
			);
			if (queryRes.LastEvaluatedKey)
				return { LastEvaluatedKey: queryRes.LastEvaluatedKey, images };
			const res = await this.dynamo.send(
				new UpdateCommand({
					TableName: this.tableName,
					Key: {
						category: "allCategories",
						productId: 0,
					},
					UpdateExpression: `REMOVE #category`,
					ExpressionAttributeNames: {
						"#category": category,
					},
					ReturnValues: "UPDATED_NEW",
				})
			);

			return { status: "success", images };
		} catch (error: any) {
			return { error };
		}
	};
}
