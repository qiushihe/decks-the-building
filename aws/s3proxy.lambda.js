// Use https://closure-compiler.appspot.com to compile/minify

const AWS = require("aws-sdk");

const s3 = new AWS.S3();

exports.handler = (evt, ctx) => {
  const objectKey = evt.requestContext.path
    .replace(new RegExp("^\/" + evt.requestContext.stage), "")
    .replace(/^\//, "");

  s3.getObject({
    Bucket: process.env.ARTIFACTS_BUCKET_NAME,
    Key: objectKey
  }, (err, data) => {
    if (err) {
      ctx.succeed({
        statusCode: 500,
        headers: { "Content-Type": "text/html" },
        body:
          "<h1>Oh Nose! Shit didn't work!</h1>" +
          "<pre>Error: " +
          JSON.stringify(err) +
          "</pre>"
      });
    } else {
      let responseBody = data.Body.toString();
      let responseContentType = data.ContentType;
      let isBase64Encoded = false;

      const fontMatch = objectKey.match(/\.(woff|woff2|tff)$/);
      if (fontMatch) {
        responseContentType = "font/" + fontMatch[1];
        responseBody = data.Body.toString("base64");
        isBase64Encoded = true;
      }

      ctx.succeed({
        statusCode: 200,
        headers: {
          "Content-Type": responseContentType,
          "Content-Length": data.ContentLength
        },
        body: responseBody,
        isBase64Encoded: isBase64Encoded
      });
    }
  });
};
