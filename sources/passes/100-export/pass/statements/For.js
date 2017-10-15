var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("For", function (node) {
  if (node.isAsync) {
    var str = "";
    str += "function(" + Export.std.next + "){";
    str += Export.std.async + "._for(";
    if (node.condition.isAsync) {
      str += "[1," + Export.node("Expression", node.condition) + "]";
    }
    else {
      str += "[0," + Export.node("Expression", node.condition) + "]";
    }
    str += ",";
    str += Export.node("Block", node.block, true);
    str += "," + Export.std.next + ");";
    str += "}";
    return str;
  }
  else {
    var str = "";
    str += "while(" + Export.node("Expression", node.condition) + "){";
    str += Export.node("Block", node.block);
    str += "}";
    return str;
  }
});
