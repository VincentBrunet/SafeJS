
Operation "Operation" =
    e1: (Identifier/Litteral)
    _
    op: Operator
    _
    e2: (Expression/Litteral)
{
    return {
        ast_type: "Operation",
        ast_childs: {
            Op: op,
            E1: e1,
            E2: e2,
        },
    };
}
