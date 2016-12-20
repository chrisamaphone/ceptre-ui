
function render_nl(transition) {

  var line = transition.command;
  var action = line.rulename;
  var dialogue = generateDialogue(action, line.args);

  return dialogue;
}

function main() {
  var ws = io.connect();
  ws.on('file contents', function(data) {
    console.log(data);
    var t = JSON.parse(data);
    transition = t;
    var rendered = render_nl(t);
    $('#trace').append("<pre>"+rendered+"</pre>"); 
    // document.getElementById('trace').innerHTML = "salfkjs"
  });
}

main();
