// Use https://closure-compiler.appspot.com to compile/minify

const buildPolicy = (event, principalId) => {
  const methodArnParts = event.methodArn.split(":");
  const apiGatewayArnTmp = methodArnParts[5].split("/");
  const awsAccountId = methodArnParts[4];
  const awsRegion = methodArnParts[3];
  const restApiId = apiGatewayArnTmp[0];
  const stage = apiGatewayArnTmp[1];
  const apiArn =
    "arn:aws:execute-api:" +
    awsRegion +
    ":" +
    awsAccountId +
    ":" +
    restApiId +
    "/" +
    stage +
    "/*/*";

  return {
    principalId: principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [{
        Action: "execute-api:Invoke",
        Effect: "Allow",
        Resource: [apiArn]
      }]
    }
  };
};

exports.handler = function(event, context, callback) {
  const authorizationHeader =
    event.headers["authorization"] || event.headers["Authorization"];

  if (!authorizationHeader) {
    return callback("Unauthorized");
  }

  const encodedAuthorization = authorizationHeader.split(" ")[1];
  const decidedAuthorization = new Buffer(encodedAuthorization, "base64").toString().split(":");
  const username = decidedAuthorization[0];
  const password = decidedAuthorization[1];

  if (!(username === "admin" && password === "secret")) {
    return callback("Unauthorized");
  }

  callback(null, buildPolicy(event, username));
};
