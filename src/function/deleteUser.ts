import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler = async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: "users",
    Key: {
      primaryKey: { S: "id" },
    },
  };

  await document.delete(params, (error, data) => {
    if (!params.Key) {
      return {
        error: error,
        statusCode: 404,
        message: "User Not Found",
      };
    } else {
      return {
        statusCode: 200,
        data: data,
      };
    }
  });
};
