// Use https://closure-compiler.appspot.com to compile/minify

// TODO: https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example-deployment-pkg.html
// TODO: https://stackoverflow.com/a/48491845

exports.handler = (evt, ctx) => {
  ctx.succeed({
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body:
      "<h1>It CloudFormation!</h1>" +
      "<pre>" +
      JSON.stringify(process.env, null, 2) +
      "</pre>" +
      "<pre>" +
      JSON.stringify(evt, null, 2) +
      "</pre>"
  });
};
