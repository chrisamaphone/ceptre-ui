
function entity_to_image(e) {
  switch(e) {
    case "cat": return "cat_l";
    case "floor": return "carpet";
    case "wall": return "wall";
    case "heart": return "heart";
    case "dagger": return "dagger";
    default: return "carpet";
  }
}

function render_nl(transition) {

  var line = transition.command;
  var action = line.rulename;
  var dialogue = generateDialogue(action, line.args);

  return dialogue;
}

function removeFirst(element, array) {
  array.splice(array.indexOf(element), 1);
}

function member(element, array) {
  return array.indexOf(element) >= 0;
}

function filter_ats(atoms) {
  var ats = [];
  for(var i = 0; i < atoms.length; i++) {
    var atom = atoms[i];
    if (atom.pred == "at") {
      var x = parseInt(atom.args[0]);
      var y = parseInt(atom.args[1]);
      ats.push({x: x, y: y, entity: atom.args[2]});
    }
  }
  return ats;
}


function process_transition(t) {
  // var s = JSON.stringify(t);
  // $('#trace').append("<pre>"+s+"</pre>"); 
  
  var removed_ats = filter_ats(t.removed);
  var added_ats = filter_ats(t.added);

  // debugging
  console.log("-" + JSON.stringify(removed_ats));
  console.log("+" + JSON.stringify(added_ats));
  
  // $('#trace').append("<pre> +"+JSON.stringify(added_ats)+"</pre>"); 

  // remove elements from tilegrid
  for(var i=0; i < removed_ats.length; i++) {
    var x = removed_ats[i].x;
    var y = removed_ats[i].y;
    var to_remove = entity_to_image(removed_ats[i].entity);
    removeFirst(to_remove, tilegrid[y][x]); 
  }

  // add elements to tilegrid
  for(var i=0; i < added_ats.length; i++) {
    var x = added_ats[i].x;
    var y = added_ats[i].y;
    var to_add = entity_to_image(added_ats[i].entity);
    var current_entities = tilegrid[y][x];
    if (! member(to_add, current_entities)) {
      tilegrid[y][x].push(to_add);
    }
  }

}

function init_tiles(canvas) {
  var width = canvas.width/tilesize;
  var height = canvas.height/tilesize;
  initialize_empty(width,height); // empty tilegrid
}

function render_map(canvas, transition) {
    process_transition(transition);
    draw(canvas);
}

function main() {
  var ws = io.connect();
  var canvas = document.getElementById('map');
  init_tiles(canvas);

  ws.on('file contents', function(data) {
    var t = JSON.parse(data);
    /*
    var rendered = render_nl(t);
    $('#trace').append("<pre>"+rendered+"</pre>"); 
    */
    render_map(canvas, t);
  });
}

main();
