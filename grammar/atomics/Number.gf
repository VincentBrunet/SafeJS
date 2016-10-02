
Number "Number" =
    nb:[0-9]+
{
    var value = nb.join("");
    return {
        ast_type: "Number",
        ast_title: value,
    };
}
