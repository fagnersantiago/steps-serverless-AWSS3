import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler = async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: "users",
    Key: {
      id: "id",
    },
  };

  try {
    await document.delete(params).promise();
    if (!params.Key) {
      return {
        message: "User not found",
        statusCode: 404,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
  };
};
