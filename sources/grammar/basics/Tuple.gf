
Tuple "Tuple" =
    "("
    values :(_ Expression _ ",")*
    lastValue :(_ Expression)?
    _ ")"
{
    var elements = [];
    values.forEach(function (value) {
        elements.push(value[1]);
    });
    if (lastValue) {
        elements.push(lastValue[1]);
    }
    return ast({
        ast_type: "Tuple",
        ast_title: "(x" + elements.length + ")",
        ast_childs: elements,
    });
}
