import {
	S3Client,
	PutObjectCommand,
	DeleteObjectsCommand,
	ListObjectsV2Command,
	DeleteObjectsCommandOutput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Bucket = process.env.S3_BUCKET_NAME as string;
export class s3Service {
	private s3Client: S3Client;
	constructor() {
		this.s3Client = new S3Client({
			region: "auto",
			endpoint: process.env.S3_URL as string,
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
			},
		});
	}
	public async getpresignedUrl(images: string[]) {
		const presignedUrls = images.map(async (imageKey: string) => {
			const command = new PutObjectCommand({
				Bucket,
				Key: `products/${imageKey}`,
				ContentType: `image/${imageKey.split(".").pop()}`,
			});
			return await getSignedUrl(this.s3Client, command, { expiresIn: 60 * 60 });
		});
		this.s3Client.destroy();
		return Promise.all(presignedUrls);
	}
	public async deleteImages(Prefix: string) {
		try {
			// Fetching the keys of all the images related to the productId
			const imageKeys = await this.s3Client.send(
				new ListObjectsV2Command({ Bucket, Prefix })
			);
			if (imageKeys.$metadata.httpStatusCode !== 200)
				throw new Error("Couldn't find images");
			const params = {
				Bucket,
				Delete: {
					Objects: imageKeys.Contents?.map((image) => {
						return { Key: image.Key };
					}),
				},
			};
			// Deleting the images for the productId
			const s3res = await this.s3Client.send(new DeleteObjectsCommand(params));
			if (!s3res.Deleted) throw new Error("Couldn't delete images");
			this.s3Client.destroy();
			return { status: "success", message: "Successfull deletion of images" };
		} catch (error: any) {
			this.s3Client.destroy();
			return { status: "S3error", message: error.message };
		}
	}
	public async deleteCategory(imageKeys: string[] = []) {
		try {
			let s3res: DeleteObjectsCommandOutput;
			do {
				const params = {
					Bucket,
					Delete: {
						Objects: imageKeys.slice(0, 1000).map((imageKey) => {
							return { Key: imageKey };
						}),
					},
				};
				s3res = await this.s3Client.send(new DeleteObjectsCommand(params));
				imageKeys.splice(0, 1000);
			} while (imageKeys.length > 0);
			this.s3Client.destroy();
			if (s3res.$metadata.httpStatusCode === 200)
				return { status: "success", message: "Successfull deletion of images" };
		} catch (error: any) {
			return { status: "S3error", message: error.message };
		}
	}
}
