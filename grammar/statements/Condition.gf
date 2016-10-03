
If =
    'if'
    __ condition :Expression
    _ '{'
    _ block :Block
    _ '}'
{
    return {
        ast_type: "If",
        ast_childs: {
            Condition: condition,
            Block: block,
        }
    }
}

ElseIf =
    'else'
    __ 'if'
    __ condition :Expression
    _ '{'
    _ block :Block
    _ '}'
{
    return {
        ast_type: "ElseIf",
        ast_childs: {
            Condition: condition,
            Block: block,
        }
    }
}

Else =
    'else'
    _ '{'
    _ block :Block
    _ '}'
{
    return {
        ast_type: "Else",
        ast_childs: {
            Block: block,
        }
    }
}

Condition "Condition" =
    p_if :If
    p_elseIf :(_ ElseIf)*
    p_else :(_ Else)?
{
    var conds = [];
    conds.push(p_if);
    p_elseIf.forEach(function (p_elseIf) {
        conds.push(p_elseIf[1]);
    });
    if (p_else) {
        conds.push(p_else[1]);
    }
    return {
        ast_type: "Condition",
        ast_childs: conds,
    }
}

