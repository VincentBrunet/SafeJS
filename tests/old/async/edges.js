
function tt(ret) {
    console.log(" - Called", ret);
    return ret;
}

console.log("Or prop");
if (tt(false) || tt(true)) {
    console.log("Or prop, yes");
} else {
    console.log("Or prop, no");
}

console.log("Or stop");
if (tt(true) || tt(false)) {
    console.log("Or stop, yes");
} else {
    console.log("Or stop, no");
}

console.log("And prop");
if (tt(true) && tt(true)) {
    console.log("And prop, yes");
} else {
    console.log("And prop, no");
}

console.log("And stop");
if (tt(false) && tt(true)) {
    console.log("And stop, yes");
} else {
    console.log("And stop, no");
}

console.log("OR stop, ex");
var ttt = tt(false) || tt(true);
var ttt2 = tt(true) || tt(false);
