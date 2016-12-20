var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var watcher = require('filewatcher')();

var port = process.env.PORT || 5000

app.use(express.static(__dirname + '/public'));

server.listen(port, function() { 
  console.log("Connection key: " + this._connectionKey)
  console.log('http server listening on %d', port);
  console.log('working dir: '+__dirname);
});



// File reading and communication with client

var ceptre_file = './ceptre.json';
watcher.add(ceptre_file);


io.on('connection', function(socket){
  console.log('connected');
  watcher.on('change', function(file, stat) {
    watcher.remove(ceptre_file);
    console.log('file changed');
    fs.readFile(file, 'utf8', function(err, data) {
      console.log('Contents: %s', data);
      io.emit('file contents', data);
    });
    watcher.add(ceptre_file);
  });
});

