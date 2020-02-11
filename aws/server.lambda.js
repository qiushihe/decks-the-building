// Use https://closure-compiler.appspot.com to compile/minify

// TODO: HTTP Basic:
//       * https://gist.github.com/lmakarov/e5984ec16a76548ff2b278c06027f1a4
//       * https://medium.com/hackernoon/serverless-password-protecting-a-static-website-in-an-aws-s3-bucket-bfaaa01b8666

exports.handler = (evt, ctx) => {
  ctx.succeed({
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body:
      "<h1>It CloudFormation!</h1><pre>" +
      JSON.stringify(evt, null, 2) +
      "</pre>"
  });
};
