// Use https://closure-compiler.appspot.com to compile/minify

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
