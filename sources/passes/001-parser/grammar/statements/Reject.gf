
Reject "Reject" =
    "reject"
    p_e :(__ Expression)?
{
    var e;
    if (p_e) {
        e = p_e[1];
    }
    return ast({
        ast_type: "Reject",
        ast_childs: {
            Expression: e,
        },
    });
}
