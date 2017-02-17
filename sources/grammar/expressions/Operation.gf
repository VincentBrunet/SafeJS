
Operation "Operation" = OperationP16

OperationP16 =
    head: (OperationP15/ExpressionSimple)
    tails: (_ ("=" / "-=" / "+=" / "*=" / "/=" / "%=" / "<<=" / ">>>=" / ">>=" / "&=" / "|=" / "^=") _ (OperationP15/ExpressionSimple))*
{
    return RightToLeftOp(head, tails);
}

OperationP15 =
    OperationP14 // FIX-ME add ternary?

OperationP14 =
    head: (OperationP13/ExpressionSimple)
    tails: (_ ("||") _ (OperationP13/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP13 =
    head: (OperationP12/ExpressionSimple)
    tails: (_ ("&&") _ (OperationP12/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP12 =
    head: (OperationP11/ExpressionSimple)
    tails: (_ ("|") _ (OperationP11/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP11 =
    head: (OperationP10/ExpressionSimple)
    tails: (_ ("^") _ (OperationP10/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP10 =
    head: (OperationP9/ExpressionSimple)
    tails: (_ ("&") _ (OperationP9/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP9 =
    head: (OperationP8/ExpressionSimple)
    tails: (_ ("==="/ "==" / "!==" / "!=") _ (OperationP8/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP8 =
    head: (OperationP7/ExpressionSimple)
    tails: (
        _ ("<=" / "<" / ">=" / ">" / $("instanceof" __) / $("in" __))
        _ (OperationP7/ExpressionSimple)
    )*
{
    return LeftToRightOp(head, tails);
}

OperationP7 =
    head: (OperationP6/ExpressionSimple)
    tails: (_ (">>>" / ">>" / "<<") _ (OperationP6/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP6 =
    head: (OperationP5/ExpressionSimple)
    tails: (_ ("+" / "-") _ (OperationP5/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP5 =
    head: (OperationP4/ExpressionSimple)
    tails: (_ ("*" / "%" / "/") _ (OperationP4/ExpressionSimple))*
{
    return LeftToRightOp(head, tails);
}

OperationP4 =
    heads: ((
        "++" / "--" / "+" / "-"
        / "!" / "~"
        / ($("typeof" __))
        / ($("void" __))
        / ($("delete" __))
    ) _)*
    tail: (OperationP3/ExpressionSimple)
{
    if (heads.length <= 0) {
        return tail;
    }
    heads.reverse();
    var e = tail;
    heads.forEach(function (head) {
        var op = head[0].trim();
        op = op + "X";
        e = ast({
            ast_type: "Operation",
            ast_title: op,
            ast_childs: {
                E1: e,
            },
            ast_datas: {
                op: op,
            },
        });
    });
    return e;
}

OperationP3 =
    head: (OperationP2/ExpressionSimple)
    tail: (_ ("++" / "--"))?
{
    if (!tail) {
        return head;
    }
    var op = "X" + tail[1];
    return ast({
        ast_type: "Operation",
        ast_title: op,
        ast_childs: {
            E1: head,
        },
        ast_datas: {
            op: op,
        },
    });
}

OperationPTuple =
    params: (_ (Expression) _ ",")*
    lastParam: (_ Expression)?
{
    var elements = [];
    params.forEach(function (param) {
        elements.push(param[1]);
    });
    if (lastParam) {
        elements.push(lastParam[1]);
    }
    return ast({
        ast_type: "Litteral",
        ast_childs: {
            Content: ast({
                ast_type: "Tuple",
                ast_title: "(x" + elements.length + ")",
                ast_childs: elements,
            }),
        },
    });
}

OperationP2 =
    head: (OperationP1/ExpressionSimple)
    tails: (
        (_ "[" _ (Expression) _ "]")
        / ("" "." "" Identifier)
        / (_ "(" _ OperationPTuple _ ")")
    )*
{
    return LeftToRightOp(head, tails, {
        "[": "ACCESS",
        ".": ".",
        "(": "CALL",
    });
}

OperationNew = 
    "new"
    __ expression :(OperationP1/ExpressionSimple)
    p_params :(_ "(" _ OperationPTuple _ ")")?
{
    var params;
    if (p_params) {
        params = p_params[3];
    }
    return ast({
        ast_type: "Operation",
        ast_title: "new",
        ast_childs: {
            E1: expression,
            E2: params,
        },
        ast_datas: {
            op: "new",
        },
    });
}

OperationP1 =
    e: (
        OperationNew
        / (OperationP0_5/ExpressionSimple)
    )
{
    return e;
}

OperationDeasync =
    "@"
    _ expression: (OperationP0_5/ExpressionSimple)
{
    return ast({
        ast_type: "Operation",
        ast_title: "@",
        ast_childs: {
            E1: expression,
        },
        ast_datas: {
            op: "@",
        },
    });
}

OperationP0_5 =
    e: (
        OperationDeasync
        / (OperationP0/ExpressionSimple)
    )
{
    return e;
}

OperationP0 =
    "("
    _ e :ExpressionContent
    _ ")"
{
    return e;
}

