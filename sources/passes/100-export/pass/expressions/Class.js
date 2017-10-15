var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Class", function (node) {
  var str = "";
  str += "function ";
  if (node.name) {
    str += node.name;
  } else {
    str += "/* ANONYMOUS */";
  }
  // str += " " + node.params.export(_context);
  str += " {";
  str += Export.node("Block", node.block);
  str += "}";
  return str;
});
