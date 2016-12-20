
function render_nl(transition) {

  var line = transition.command;
  var action = line.rulename;
  var dialogue = generateDialogue(action, line.args);

  return dialogue;
}

function process_transition(t) {
  // XXX TODO
}

function render_map(canvas, transition) {
    process_transition(transition);
    draw(canvas);
}

function main() {
  var ws = io.connect();

  ws.on('file contents', function(data) {
    console.log(data);
    var t = JSON.parse(data);
    /*
    var rendered = render_nl(t);
    $('#trace').append("<pre>"+rendered+"</pre>"); 
    */
    var canvas = document.getElementById('map');
    render_map(canvas, t);
  });
}

main();
