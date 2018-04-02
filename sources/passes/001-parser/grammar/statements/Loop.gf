
Repeat =
    "repeat"
    __ expression :Expression
    _ '{'
    _ block: Block
    _ '}'
{
    return ast({
        ast_type: "Repeat",
        ast_childs: {
            Expression: expression,
            Block: block,
        },
    });
}

While =
    "while"
    __ condition :Expression
    _ '{'
    _ block: Block
    _ '}'
{
    return ast({
        ast_type: "While",
        ast_childs: {
            Condition: condition,
            Block: block,
        },
    });
}

For =
    "for"
    __ name :Identifier
    __ "in"
    __ expression :Expression
    _ '{'
    _ block: Block
    _ '}'
{
    return ast({
        ast_type: "For",
        ast_childs: {
            Name: name,
            Expression: expression,
            Block: block,
        }
    });
}

Loop "Loop" =
    loop :(
        While
        / Repeat
        / For
    )
{
    return loop;
}