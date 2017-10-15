// Basic utils
var utils = require("../../utils");

// Basic AST pass code
var Export = require("./pass");

/**
 */
module.exports = function(session, astBefore, next) {
  try {
    var astExport = "var module = " + Export.do(astBefore, true) + ";";
    return next(true, astExport);
  } catch (error) {
    console.log("Export error", error);
    return next(false, undefined, utils.trace.make(error));
  }
};
