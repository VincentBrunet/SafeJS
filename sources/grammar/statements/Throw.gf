
Throw "Throw" =
    "throw"
    p_e :(__ Expression)?
{
    var e;
    if (p_e) {
        e = p_e[1];
    }
    return ast({
        ast_type: "Throw",
        ast_childs: {
            Expression: e,
        },
    });
}
