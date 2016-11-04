var http = require("http");
var fs = require("fs");
var filewatcher = require("filewatcher");
var current_data = "Initial value";

var watcher = filewatcher();
watcher.add("./test.txt");


watcher.on('change', function(file,stat) {
  console.log("File modified: %s", file);
  fs.readFile(file, 'utf8', function(err, data) {
    console.log("Contents: %s", data);
    current_data = data;
    var options = {
      host: '127.0.0.1',
      path: '/',
      port: '8081',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    var req = http.request(options);
    req.write(data);
    req.end();
  });
  if(!stat) console.log("deleted");
});

var ok = 200
var plaintext = {'Content-Type': 'text/plain'}

function respond(request, response) {
  console.log("Responding to request "+JSON.stringify(request.headers));
  response.writeHead(ok, plaintext);
  response.end(current_data);
}

var port = 8081
var server = http.createServer(respond);
  
server.listen(port);

console.log("Server running at http://127.0.0.1:"+port+"/");
