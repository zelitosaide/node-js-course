import http from "http";

const server = http.createServer(function (req, res) {
  const host = req.headers.host;
  const connection = req.headers.connection;
  const cacheControl = req.headers["cache-control"];
  const userAgent = req.headers["user-agent"];
  const accept = req.headers.accept;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(
    JSON.stringify({
      method: req.method,
      host,
      connection,
      cacheControl,
      userAgent,
      accept,
      url: req.url,
      // req: req.headers,
      httpVersion: req.httpVersion,
      // rawHeaders: req.rawHeaders,
      rawTrailers: req.rawTrailers,
      statusCode: req.statusCode,
      statusMessage: req.statusMessage,
    })
  );
});

server.listen(3000, function () {
  console.log("running");
});
