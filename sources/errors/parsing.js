// Basic utils
var utils = require("../utils");

function displayParsingError(reason, error) {
  if (reason == "ReadError") {
    console.log("- READ FILE ERROR -".red);
    console.log(error.message.yellow);
  }
  if (reason == "ParsingError") {
    console.log("- PARSING ERROR -".red);
    var msg = "";
    console.log(error);
  }
}

module.exports = {
  explain: displayParsingError,
};
