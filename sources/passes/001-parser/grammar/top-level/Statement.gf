
BlockStatement =
    "{"
    _ block :Block
    _ "}"
{
    return block;
}

Statement =
    content:(
        Variable
        / Condition
        / Loop
        / TryCatch
        / Return
        / Resolve
        / Reject
        / Throw
        / Break
        / Continue
        / Expression
        / BlockStatement
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
