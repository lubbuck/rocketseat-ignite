import http from "http"

const server = http.createServer((req, res) => {
  return res.end("Hello world");
})

server.listen(3333)
