var utils = require("../utils");

module.exports = function(session, next) {
  session.profilingStart("compiler");

  console.log("--- Compile ---");
  var compiled = session.getParsedAst().compile({
    depth: 0,
  });

  // console.log("Compiled", compiled);
  // var parsed = session.getParsedAst();
  // utils.astDisplay(session.getParsedAst());

  session.setCompiledAst(compiled);

  session.profilingEnd("compiler");
  return next(true);
};
