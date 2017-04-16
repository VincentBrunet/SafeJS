var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Class", function (node) {
  var str = "";
  str += "class ";
  if (node.name) {
    str += node.name;
  } else {
    str += "/* ANONYMOUS */";
  }
  // str += " " + node.params.export(_context);
  str += " {";
  str += "\n";
  str += Export.node("Block", node.block);
  str += "}";
  return str;
});
