// Use https://closure-compiler.appspot.com to compile/minify

const AWS = require("aws-sdk");

const s3 = new AWS.S3();

exports.handler = (evt, ctx) => {
  s3.getObject({
    Bucket: process.env.ARTIFACTS_BUCKET_NAME,
    Key: evt.requestContext.path.replace(new RegExp("^\/" + evt.requestContext.stage), "").replace(/^\//, "")
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
      ctx.succeed({
        statusCode: 200,
        headers: {
          "Content-Type": data.ContentType,
          "Content-Length": data.ContentLength
        },
        body: data.Body.toString()
      });
    }
  });
};
