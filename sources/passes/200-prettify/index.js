// Basic utils
var utils = require("../../utils");

// Prettifier
var beautify = require('js-beautify').js_beautify

/**
 */
module.exports = function(session, uglyJs, next) {
  try {
    var prettyJs = beautify(uglyJs, {
      indent_size: 2,
      end_with_newline: true,
      brace_style: "collapse",
    });
    return next(true, prettyJs);
  } catch (error) {
    console.log("Prettify error", error);
    return next(false, undefined, utils.trace.make(error));
  }
};

