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
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  let user = response.Items?.[0] as IUserDTO;

  if (!user) {
    await document
      .put({
        TableName: "users",
        Item: {
          id,
          name,
          email,
        },
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ id, name, email }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "User already exists",
        user,
      }),
    };
  }
};
