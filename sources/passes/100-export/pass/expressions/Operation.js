var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Operation", function (node) {
  if (node.isAsync) {
    var str = "";
    str += "function(" + Export.std.next + "){";
    str += Export.std.async + "._op(";
    str += "'" + node.op + "',";
    if (node.e1.isAsync) {
      str += "[1," + Export.node("Expression", node.e1) + "],";
    }
    else {
      str += "[0," + Export.node("Expression", node.e1) + "],";
    }
    if (node.e2) {
      if (node.e2.isAsync) {
        str += "[1," + Export.node("Expression", node.e2) + "]";
      }
      else {
        str += "[0," + Export.node("Expression", node.e2) + "]";
      }
    }
    else {
      str += "null";
    }
    str += "," + Export.std.next + ");";
    str += "}";
    return str;
  }
  else {
    var str = "";
    str += Export.std.sync + "._op(";
    str += "'" + node.op + "',";
    str += Export.node("Expression", node.e1);
    if (node.e2) {
      str += "," + Export.node("Expression", node.e2);
    }
    str += ")";
    return str;
  }
});
