
If =
    'if'
    __ condition :Expression
    _ '{'
    _ block :Block
    _ '}'
{
    return ast({
        ast_type: "If",
        ast_childs: {
            Expression: condition,
            Block: block,
        },
    });
}

ElseIf =
    'else'
    __ 'if'
    __ condition :Expression
    _ '{'
    _ block :Block
    _ '}'
{
    return ast({
        ast_type: "ElseIf",
        ast_childs: {
            Expression: condition,
            Block: block,
        },
    });
}

Else =
    'else'
    _ '{'
    _ block :Block
    _ '}'
{
    return ast({
        ast_type: "Else",
        ast_childs: {
            Block: block,
        },
    });
}

Condition "Condition" =
    p_if :If
    p_elseIf :(_ ElseIf)*
    p_else :(_ Else)?
{
    var condIf = p_if;
    var condElseIfs;
    var condElse;
    p_elseIf.forEach(function (elseIf) {
        if (!condElseIfs) {
            condElseIfs = [];
        }
        condElseIfs.push(elseIf[1]);
    });
    if (p_else) {
        condElse = p_else[1];
    }
    return ast({
        ast_type: "Condition",
        ast_childs: {
            If: condIf,
            ElseIfs: condElseIfs,
            Else: condElse,
        },
    });
}

