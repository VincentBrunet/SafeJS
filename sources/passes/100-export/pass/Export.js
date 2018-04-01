var utils = require("../../../utils");
var core = require("../../core");

var Export = new core.Pass("Export");

var stdEmoji = {
    next: "💧",
    async: "🌪",
    sync: "🔥",
    tmp1: "⏱1",
    tmp2: "⏱2",
    tmp3: "⏱3",
    tmp4: "⏱4",
    this: "",
};

var stdSign = {
    next: "⇒",
    async: "∆",
    sync: "∇",
    tmp1: "√1",
    tmp2: "√2",
    tmp3: "√3",
    tmp4: "√4",
};

var stdAscii = {
    next: "_$n",
    async: "_$A",
    sync: "_$S",
    tmp1: "_$1",
    tmp2: "_$2",
    tmp3: "_$3",
    tmp4: "_$4",
    this: "_$T",
};

Export.std = stdAscii;

module.exports = Export;
