function main() {
  var ws = io.connect();
  ws.on('file contents', function(data) {
    console.log(data);
    $('#trace').append("<pre>"+data+"</pre><br><br>"); 
    // document.getElementById('trace').innerHTML = "salfkjs"
  });
}

main();
