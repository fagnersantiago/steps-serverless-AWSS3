import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler = async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: "users",
    Key: {
      S: "id",
    },
  };

  try {
    await document.delete(params).promise();
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
  };
};
