var url = require("url");
var parts = url.parse(window.location.href);
console.log(parts);

document.getElementById('test').innerHTML = parts;

