var http = require("http");

var ok = 200
var plaintext = {'Content-Type': 'text/plain'}

function respond(request, response) {
  response.writeHead(ok, plaintext);
  response.end('Hello world\n');
}

var port = 8081
var server = http.createServer(respond);
  
server.listen(port);

console.log("Server running at http://127.0.0.1:"+port+"/");
