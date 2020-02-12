// Use https://closure-compiler.appspot.com to compile/minify

const https = require("https");
const url = require("url");

const newId = (len, radix) => {
  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  const chars = alphabet.split("");

  const newId = [];

  radix = radix || chars.length;
  len = len || 22;

  let i = 0;
  for (i = 0; i < len; i++) {
    newId[i] = chars[0 | (Math.random() * radix)];
  }

  return newId.join("");
};

exports.handler = (evt, ctx) => {
  const responseBody = JSON.stringify({
    Status: "SUCCESS",
    PhysicalResourceId: ctx.logStreamName,
    StackId: evt.StackId,
    RequestId: evt.RequestId,
    LogicalResourceId: evt.LogicalResourceId,
    Data: {
      AlphanumericValue: newId(10, 62),
      AlphanumericNoCapValue: newId(10, 36)
    }
  });

  const parsedUrl = url.parse(evt.ResponseURL);

  const request = https.request(
    {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.path,
      method: "PUT",
      headers: { "content-length": responseBody.length }
    },
    () => ctx.done()
  );

  request.on("error", () => ctx.done());
  request.write(responseBody);
  request.end();
};
