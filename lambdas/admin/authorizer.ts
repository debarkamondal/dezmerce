import {
	APIGatewayRequestAuthorizerEventV2,
	APIGatewaySimpleAuthorizerWithContextResult,
	Handler,
} from "aws-lambda";
import { verify } from "jsonwebtoken";

export const handler: Handler = async (
	event: APIGatewayRequestAuthorizerEventV2
): Promise<APIGatewaySimpleAuthorizerWithContextResult<{}>> => {
	let isAuthorized = false;
	let context = {};
	const cookies = event.cookies;
	const accessToken = cookies
		?.find((cookie) => cookie.startsWith("accessToken"))
		?.split("=")
		.pop();
	try {
		if (!accessToken) throw new Error("Unauthorized");
		const decoded = verify(accessToken, process.env.JWT_SECRET as string);
		isAuthorized = true;
		context = decoded;
	} catch (error: any) {
		context = error;
	}
	return {
		isAuthorized,
		context,
	};
};
