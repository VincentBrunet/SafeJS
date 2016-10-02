
Operator "Operator" =
    op: (
        '+'
        / '-'
        / '/'
        / '*'
        / '%'
    )
{
    return {
        ast_type: "Operator",
        ast_title: op,
    };
}
