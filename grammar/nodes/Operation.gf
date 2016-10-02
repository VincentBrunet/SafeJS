
Operation "Operation" =
    e1: Litteral
    _
    op: Operator
    _
    e2: (Operation/Litteral)
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
