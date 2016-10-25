
Return "Return" =
    "return"
    p_e :(__ Expression)?
{
    var e;
    if (p_e) {
        e = p_e[1];
    }
    return {
        ast_type: "Return",
        ast_childs: {
            E: e,
        },
    }
}
