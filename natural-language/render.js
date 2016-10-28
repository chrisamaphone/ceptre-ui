
// (change_topic 9 bob chair positive table)
// let [x41, x40, x39] = (...) [x23, [x5, [x1, [x37, [(relevant []), []]]]]]
var change_topic = 
  { command: {rulename: "change_topic", args:["9", "bob", "chair", "positive", "table"]},
    removed: ["x23", "x5", "x1", "x37"],
    added:   ["x41", "x40", "x39"]
  }
var default_input = change_topic

// UI stuff
window.onload = function() {

var renderButton = document.getElementById("renderButton");
  renderButton.addEventListener("click", function () {
  var source = document.getElementById('input').value;
  var rendered = render(source); 
  document.getElementById("rendered").innerHTML += "<pre>"+rendered+"</pre>";
});

// Get rid of quotes introduced by JSON.stringify
var input_string = JSON.stringify(default_input);
// input_string = input_string.replace(/\"([^(\")"]+)\":/g,"$1:");
document.getElementById('input').innerHTML = input_string;
}


function generateDialogue(action, args) {

  switch(action) {
    case "change_topic":
      var speaker = args[1];
      var topic = args[4];
      return speaker+": Let's talk about the "+topic+" instead.";
  }

}

var transition;

function render (transition_string) {

  transition = JSON.parse(transition_string);

  var line = transition.command;
  var action = line.rulename;
  var dialogue = generateDialogue(action, line.args);

  return dialogue;

}



