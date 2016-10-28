

// UI stuff
window.onload = function() {

var generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", function () {
  source = document.getElementById('predicates').value;
  var generated = generate(); 
  document.getElementById("generated").innerHTML = "<pre>"+generated+"</pre>";
});

document.getElementById('predicates').innerHTML = source;
// document.getElementById('fileinput').addEventListener('change', readFileAndDisplay, false);
}

// Utils

function tokenize(s) {
  // var csv = s.split(/\)\,\s*/);
  var tokens = s.split(",");
  for(var i = 0; i < tokens.length; i++) {
    deparenthesized = tokens[i].split(/\((.*)\)/);
    if (deparenthesized.length > 1) {
      tokens[i] = deparenthesized[1];
    }
  }
  return tokens;
}

function predicates(s) {
  var tokens = tokenize(s);
  var preds = [];
  for (var i = 0; i < tokens.length; i++) {
    var pred_args = tokens[i].split(/\s+/);
    var pred = pred_args.shift();

    preds.push({pred: pred, args: pred_args});
  }
  return preds;
}

function atoms_to_tiles(atoms) {
  var max_x = 0;
  var max_y = 0;
  var m = [];
  for (var i = 0; i < atoms.length; i++) {
    var p = atoms[i].pred;
    if (p == "at") {
      var args = atoms[i].args;
      var x = parseInt(args[0], 10);
      var y = parseInt(args[1], 10);
      // console.log("x= "+x+"; y = "+y);
      if(x > max_x) { max_x = x; }
      if(y > max_y) { max_y = y; }
      var entity = args[2];
      if(entity == undefined) {
        console.log("Undefined entity at "+x+", "+y+"!");
      }
      if(m[x] == undefined){
        var xrow = [];
        xrow[y] = entity;
        m[x] = xrow;
      } else {
        m[x][y] = entity;
      }
    }
  }
  console.log("Width: "+(max_x+1)+", Height: "+(max_y+1));
  return {map:m, width:max_x+1, height:max_y+1};
}



var source = "---- {(at 0 0 chest), (at 1 0 chest), (at 2 0 chest), (at 3 0 upstair), (at 0 1 door), (at 1 1 chest), (at 2 1 rat), (at 3 1 skelly), (at 0 2 door), (at 1 2 downstair), (at 2 2 skelly), (at 3 2 rat), (at 0 3 floor), (at 1 3 skelly), (at 2 3 door), (at 3 3 downstair), (stage generate)}"

token_table = 
{ "player": "@", 
  "chest": "&",
  "floor":".",
  "upstair":"^",
  "downstair":"v",
  "rat":"R",
  "skelly":"S",
  "key":"*", 
  "door":"]",
  "water":"#",
  "lock":"x"
}

// expects m[i][j] = "token" where "token" is a key in the table
function draw_map(m, width, height) {
  mapstring = "";

  for(var i=0; i<height; i++) {
    for(var j=0; j<width; j++) {
      if(m[i] != undefined && m[i][j] != undefined){
        var entity = m[i][j];
        var ch = token_table[entity];
        mapstring += ch;
        if(ch == undefined) {
          console.log("Unable to find a char for "+entity);
        }
      } else {
        mapstring += " "
      }
    }
    mapstring+="\n";
  }
  return mapstring;
}


/* Generate something same size as the source, starting from the same word
 * as the source. */
function generate () {

  var atoms = predicates(source);
  var {map, width, height} = atoms_to_tiles(atoms);
  var map_string = draw_map(map, width, height);

  return map_string;

}



