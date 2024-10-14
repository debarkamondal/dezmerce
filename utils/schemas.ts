import { z } from "zod";

export const productSchema = z.object({
	category: z.string(),
	productId: z.number(),
	gender: z.string(),
	title: z.string(),
	price: z.number(),
	description: z.string(),
	thumbnail: z.string(),
	images: z.array(z.string()),
	updatedAt: z.number(),
});
