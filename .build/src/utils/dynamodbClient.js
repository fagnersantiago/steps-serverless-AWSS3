"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.document = void 0;
var aws_sdk_1 = require("aws-sdk");
var Opitons = {
    region: process.env.IS_OFFLINE,
    endpoint: "http://localhost:8000",
    accessKey: "fakeMyKeyId",
    secretKey: "fakeSecretAccessKey",
};
var isOffline = function () {
    return process.env.IS_OFFLINE;
};
exports.document = isOffline()
    ? new aws_sdk_1.DynamoDB.DocumentClient(Opitons)
    : new aws_sdk_1.DynamoDB.DocumentClient();
//# sourceMappingURL=dynamodbClient.js.map