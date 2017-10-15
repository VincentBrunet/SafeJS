var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Repeat", function (node) {
  if (node.isAsync) {
    var str = "";
    str += "function(" + Export.std.next + "){";
    str += Export.std.async + "._repeat(";
    if (node.iterations.isAsync) {
      str += "[1," + Export.node("Expression", node.iterations) + "]";
    }
    else {
      str += "[0," + Export.node("Expression", node.iterations) + "]";
    }
    str += ",";
    str += Export.node("Block", node.block, true);
    str += "," + Export.std.next + ");";
    str += "}";
    return str;ç
  }
  else {
    var str = "";
    str += "var ";
    str += Export.std.tmp1 + ",";
    str += Export.std.tmp2 + "=";
    str += Export.node("Expression", node.iterations) + ";";
    str += "for(";
    str += Export.std.tmp1 + "=0;";
    str += Export.std.tmp1 + "<" + Export.std.tmp2 + ";";
    str += Export.std.tmp1 + "++";
    str += ")";
    str += "{";
    str += Export.node("Block", node.block);
    str += "}";
    return str;
  }
});
