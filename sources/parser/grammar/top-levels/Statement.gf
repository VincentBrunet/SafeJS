
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
    return {
        ast_type: "Statement",
        ast_title: "#",
        ast_childs: {
            Content: content,
        },
    };
}
