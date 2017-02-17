
Statement =
    content:(
        Variable
        / Condition
        / Loop
        / TryCatch
        / Return
        / Expression
    )
{
    return ast({
        ast_type: "Statement",
        ast_title: "_",
        ast_childs: {
            Content: content,
        },
    });
}
