
let value = 99;

var func1 = fn () {
    return value - 1;
}

var func2 = fn (param1) {
    return param1;
}

var func3 = fn (param1, param2) {
    return param1 + param2;
}

fn func4 (:Int, param2) {
    return param2;
}

fn func5 (:Int, :String) {
    return 22;
}

fn func6 (myInt :Int, myString :String) {
    return myString;
}

// Checks
assert.equal(func1(), 98);
assert.equal(func2(999), 999);
assert.equal(func3(1, 2), 3);
assert.equal(func4(1, 2), 2);
assert.equal(func5(42, "Hello"), 22);
assert.equal(func6(42, "Hello"), "Hello");
assert.equal(fn () {
    return 100 - value;
}(), 1);
