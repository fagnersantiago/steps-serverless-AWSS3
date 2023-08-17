import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

type IUserDTO = {
  id: string;
  name: string;
  email: string;
};

export const handler = async (event: APIGatewayProxyEvent) => {
  const { id, name, email } = JSON.parse(event.body!) as IUserDTO;

  const response = await document
    .query({
      TableName: "users",
      KeyConditionExpression: "id =:id",
      ExpressionAttributeNames: {
        ":id": id,
      },
    })
    .promise();

  if (!response.Items?.[0]) {
    await document
      .put({
        TableName: "users",
        Item: {
          name,
          email,
        },
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User created",
        name: response[0].name,
        email: response[0].email,
      }),
    };
  }
};
