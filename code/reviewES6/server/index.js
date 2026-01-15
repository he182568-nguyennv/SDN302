const http = require("http");
const port = 3000;
const server = http.createServer((req, res) => {
  const demo = "hello world";
  res.end(demo);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
