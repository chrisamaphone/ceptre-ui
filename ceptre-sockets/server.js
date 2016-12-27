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

io.on('connection', function(socket){
  console.log('connected');
  watcher.removeAll();
  watcher.add(ceptre_file);
  var last_data = ""
  watcher.on('change', function(file, stat) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (data != last_data) {
        console.log('file changed');
        console.log('Contents: %s', data);
        io.emit('file contents', data);
        last_data = data;
      } // end if
    }); // end readFile
  });
});

io.on('disconnect', function() {
  console.log('disconnected');
  watcher.removeAll();
});
