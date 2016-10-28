
var default_input = ""

// UI stuff
window.onload = function() {

var renderButton = document.getElementById("renderButton");
  renderButton.addEventListener("click", function () {
  var source = document.getElementById('input').value;
  var rendered = render(source); 
  document.getElementById("rendered").innerHTML = "<pre>"+rendered+"</pre>";
});

document.getElementById('input').innerHTML = default_input;
}



function render (transition) {

}



