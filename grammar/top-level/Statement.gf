
Statement =
    content:(
        Class
        / Variable
        / Condition
        / Loop
        / Expression
        / TryCatch
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
