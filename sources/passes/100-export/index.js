// Basic utils
var utils = require("../../utils");

// Basic AST pass code
var Export = require("./pass");

/**
 */
module.exports = function(session, astBefore, next) {
  try {
    var astExport = Export.do(astBefore);
    console.log("Exported", astExport);
    return next(true, astExport);
  } catch (error) {
    return next(false, undefined, utils.trace.make(error));
  }
};

