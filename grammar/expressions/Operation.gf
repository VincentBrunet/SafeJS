
Operation "Operation" = OperationP14

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
        e = {
            ast_type: "Operation",
            ast_title: op,
            ast_childs: {
                E1: e,
            },
            ast_datas: {
                op: op,
            },
        };
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
    return {
        ast_type: "Operation",
        ast_title: op,
        ast_childs: {
            E1: head,
        },
        ast_datas: {
            op: op,
        },
    };
}

OperationP2 =
    OperationP1
/*
    head: (OperationP1/ExpressionSimple)
    tail: (_ "(" _ ")")?
    OperationP1
{
    if (!tail) {
        return head;
    }
}
*/

OperationP1 =
    head: (OperationP0/ExpressionSimple)
    tails: (
        (_ "[" _ (Operation/ExpressionSimple) _ "]")
        / ("" "." "" Identifier)
    )*
{
    return LeftToRightOp(head, tails);
}

OperationP0 =
    "("
    _ e :(Operation/ExpressionSimple)
    _ ")"
{
    return e;
}

