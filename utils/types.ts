export type productType = {
	category: string;
	productId: string;
	gender: string;
	title: string;
	price: number;
	description: string;
	thumbnail: string;
	images: string[];
	updatedAt: string;
};

export type statusType = {
	message: string;
	status: "DBerror" | "success" | "error" | "S3Error";
};
