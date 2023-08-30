import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler = async (event: APIGatewayProxyEvent) => {
  const { id }: any = event.pathParameters;

  try {
    const userExists = await document
      .get({
        TableName: "users",
        Key: {
          id,
        },
      })
      .promise();

    if (!userExists.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not Found" }),
      };
    }

    await document
      .delete({
        TableName: "users",
        Key: {
          id,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User deleted" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred" }),
    };
  }
};
