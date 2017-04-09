var utils = require("../../../../utils");
var core = require("../core");

var Ast = new core.Pass("Ast");

/*
Ast._registered = {};

Ast.register = function (type, ctr) {
  // console.log("SaveRegister", type);
  Ast._registered[type] = ctr;
};

Ast.node = function (type, node) {
  // console.log("ReadRegister", type);
  node.type = node.ast_type;
  node.pos = node.ast_pos;
  var ctr = Ast._registered[type];
  if (!ctr) {
    console.log("Unknown type", type);
  }
  // Basic type check
  if (node.ast_type != type) {
    throw new Ast.NodeTypeError(node, type);
  }
  ctr(node);
  // delete node.ast_type;
  // delete node.ast_title;
  // delete node.ast_childs;
  // delete node.ast_datas;
  // delete node.ast_pos;
  return node;
};

Ast._predefined = {};

Ast.predefine = function (name, ctr) {
  // console.log("SavePredef", name);
  Ast._predefined[name] = ctr;
};
Ast.predefined = function (name, a, b, c, d, e) {
  // console.log("ReadPredef", name);
  return (Ast._predefined[name]).apply(undefined, [a, b, c, d, e]);
};

Ast.Error = function (type, infos) {
  return new Error(type + "::" + JSON.stringify(infos, null, 2));
};
Ast.NodeTypeError = function (node, expected) {
  var infos = {
    node: node,
    expected: expected,
  }
  return Ast.Error("NodeTypeError", infos);
};

Ast.NodeMissingData = function (node, expected) {
  var infos = {
    node: node,
    expected: expected,
  }
  return Ast.Error("NodeMissingData", infos);
};
Ast.NodeMissingChild = function (node, expected) {
  var infos = {
    node: node,
    expected: expected,
  }
  return Ast.Error("NodeMissingChild", infos);
};

Ast.NodeUnexpectedType = function (node, expecteds) {
  var infos = {
    node: node,
    expecteds: expecteds,
  }
  return Ast.Error("NodeUnexpectedType", infos);
};
*/

module.exports = Ast;
