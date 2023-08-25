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
        statusCode: 404,
        body: JSON.stringify({
          message: "User not found",
        }),
      };
    } else {
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User deleted",
        }),
      };
    }
  });
};
