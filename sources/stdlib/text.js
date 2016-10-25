

function MyProto () {
    this.TEST = 42;
    this.TESTFN = function () {
        console.log("help");
    };
}

console.log("MyProto", MyProto);
console.log("MyProto.prototype", MyProto.prototype);

MyProto.prototype.test2FN = function () {
    console.log("42");
};

var a = MyProto();
var b = new MyProto();
var c = new MyProto();

console.log("a:", a);
console.log("b:", b);
console.log("b.prototype:", b.prototype);
console.log("c:", b);
console.log("c.prototype:", c.prototype);


console.log("b.TEST:", b.TEST);
console.log("c.TEST:", c.TEST);

b.TEST = 55;

console.log("b.TEST:", b.TEST);
console.log("c.TEST:", c.TEST);

console.log("------");

for (key in b) {
    var value = b[key];
    console.log("b." + key, value);
}

for (key in c) {
    var value = c[key];
    console.log("c." + key, value);
}

console.log("------");

for (key in b) {
    if (b.hasOwnProperty(key)) {
        var value = b[key];
        console.log("b." + key, value);
    }
}

for (key in c) {
    if (c.hasOwnProperty(key)) {
        var value = c[key];
        console.log("c." + key, value);
    }
}

console.log("------");

b.test2FN();

var tt = new Date();
var u = 0;
for (var i = 0; i < 614400000; i++) {
    u += 1;
}
var ee = new Date();

console.log("TTT", ee.getTime() - tt.getTime());

