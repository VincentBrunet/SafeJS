var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("While", function (node) {
  if (node.isAsync) {
    var str = "";
    str += "function(___n){";
    str += "_tjs._async._while(";
    if (node.condition.isAsync) {
      str += "[1," + Export.node("Expression", node.condition) + "]";
    }
    else {
      str += "[0," + Export.node("Expression", node.condition) + "]";
    }
    str += ",";
    str += Export.node("Block", node.block, true);
    str += ",___n)";
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
