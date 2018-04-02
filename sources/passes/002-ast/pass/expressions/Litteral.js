// Utils
var utils = require("../../../../utils");
var ast = require("../../../../ast");

// Litteral ast structure
module.exports = function (jsonLitteral) {
  // Current pass
  var pass = require("../../pass");
  // Possible Litterals content types
  var contentTypes = {
    "Number": pass.make.Number,
    "String": pass.make.String,
    "Undefined": pass.make.Undefined,
    "Null": pass.make.Null,
    "Tuple": pass.make.Tuple,
    "Array": pass.make.Array,
    "Dict": pass.make.Dict,
    "Boolean": pass.make.Boolean,
  };
  // Check if it indeed a Litteral
  pass.check.type(jsonLitteral, "Litteral");
  // Check if has a content child
  pass.check.child(jsonLitteral, "Content");
  // Read content data
  var jsonContent = pass.read.child(jsonLitteral, "Content")
  // Check if content is correctly typed
  pass.check.type(jsonContent, utils._.keys(contentTypes));
  // Make AST Litteral node
  var astLitteral = new ast.Litteral();
  // Save content type
  astLitteral.type = pass.read.type(jsonContent);
  // Read content object, depending on type
  astLitteral.content = contentTypes[astLitteral.type](jsonContent);
  // Mark content as child
  astLitteral.content.parent = astLitteral;
  // Save original json
  astLitteral.json = jsonLitteral;
  // Done
  return astLitteral;
};
