
// (change_topic 9 bob chair positive table)
// let [x41, x40, x39] = (...) [x23, [x5, [x1, [x37, [(relevant []), []]]]]]
var change_topic = 
  { command: {rulename: "change_topic", args:["9", "bob", "chair", "positive", "table"]},
    removed: ["x23", "x5", "x1", "x37"],
    added:   ["x41", "x40", "x39"]
  }

// interrupt chair carol contrarian 8 alice
// let [x50, x49, x48, x47, x46, x45, x44, x43, x42] = (...) 
//  [x40, [x30, [x41, [(interruptive []), [x38, [x33, [x36, []]]]]]]];
var interrupt =
  { command: {rulename: "interrupt", args: ["chair", "carol", "contrarian", "8", "alice"]},
    removed: [],
    added: []
  }

var default_input = change_topic

function display (transition) {
  var rendered = render(transition);
  document.getElementById("rendered").innerHTML += "<pre>"+rendered+"</pre>";
}


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateDialogue(action, args) {

  switch(action) {
    case "initiate":
      var speaker = capitalize(args[1]);
      var topic = args[0];
      return speaker+": Let's begin discussion about the "+topic+".";
    case "change_topic":
      var speaker = capitalize(args[1]);
      var topic = args[4];
      return speaker+": Let's talk about the "+topic+" instead.";
    case "encouraged_begin_speaking_with_fact":
    // case "begin_speaking_with_fact":
      var speaker = capitalize(args[1]);
      var topic = args[0];
      var property = args[3];
      return speaker+": The "+topic+" is "+property+"."
    case "begin_speaking_with_opinion":
      var speaker = capitalize(args[1]);
      var topic = args[0];
      var sentiment = args[3];
      if(sentiment == "positive") {
        return speaker+": I like the "+topic+".";
      } else {
        return speaker+": I don't like the "+topic+".";
      } 
    case "finish_speaking_with_opinion":
      var speaker = capitalize(args[1]);
      var topic = args[0];
      var sentiment = args[2];
      if(sentiment == "positive") {
        return speaker+": I like the "+topic+".";
      } else {
        return speaker+": I don't like the "+topic+".";
      } 
    case "finish_speaking_with_fact":
      var speaker = capitalize(args[1]);
      var topic = args[0];
      var property = args[2];
      return speaker+": The "+topic+" is "+property+"."
    case "question_fact":
      var speaker = capitalize(args[1]);
      var topic = args[0];
      var property = args[3];
      return speaker+": Are you sure the "+topic+" is "+property+"?"
    case "question_opinion":
      var speaker = capitalize(args[1]);
      var topic = args[0];
      var other = args[2];
      return speaker+": Why do you feel that way about the "+topic+", "+other+"?"
    case "interrupt":
      var speaker = capitalize(args[1]);
      var interrupted = capitalize(args[4]);
      return "["+speaker+" interrupts "+interrupted+".]"
    case "happy_from_agreement":
      var speaker = capitalize(args[0]);
      var other = capitalize(args[3]);
      return speaker+": I'm glad we agree, "+other+"."
  }
  console.log("No rendering rule for "+action);
  return action+(JSON.stringify(args));

}

var transition;

/*
function render (t) {
  transition = t;

  var line = transition.command;
  var action = line.rulename;
  var dialogue = generateDialogue(action, line.args);

  return dialogue;

}

*/


