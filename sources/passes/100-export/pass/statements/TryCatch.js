var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("TryCatch", function (node) {
  if (node.isAsync) {
    var str = "";
    str += "function(___n){";
    str += "_tjs._async._try(";
    str += Export.node("Block", node.try, true) + ",";
    if (node.finally) {
      str += Export.node("Block", node.finally, true) + ",";
    } else {
      str += "null,";
    }
    var catches = [];
    utils._.each(node.catches, function (_catch) {
      var cc = "";
      cc += "function (" + _catch.identifier.name + ") {";
      cc += "return " + Export.node("Block", _catch.block, true) + ";";
      cc += "}";
      catches.push(cc);
    });
    str += "[" + catches.join(",") + "]";
    str += ", ___n);";
    str += "}";
    return str;
  }
  else {
    var str = "";
    str += "try {"
    str += Export.node("Block", node.try);
    str += "}";
    utils._.each(node.catches, function (_catch) {
      str += "catch ";
      str += "(" + _catch.identifier.name + ")";
      str += "{";
      str += Export.node("Block", _catch.block);
      str += "}";
    });
    if (node.finally) {
      str += "finally {";
      str += Export.node("Block", node.finally);
      str += "}";
    }
    return str;
  }
});
