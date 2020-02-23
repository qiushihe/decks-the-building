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
      let responseContentType = data.ContentType;

      if (objectKey.match(/\.woff$/)) {
        responseContentType = "font/woff";
      } else if (objectKey.match(/\.woff2$/)) {
        responseContentType = "font/woff2";
      }

      ctx.succeed({
        statusCode: 200,
        headers: {
          "Content-Type": responseContentType,
          "Content-Length": data.ContentLength
        },
        body: data.Body.toString()
      });
    }
  });
};
