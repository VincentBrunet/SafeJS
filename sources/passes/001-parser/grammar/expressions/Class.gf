
Class "Class" =
    "class"
    p_name :(__ Identifier)?
    _ type :Typed?
    _ '{'
    _ block: ClassBlock
    _ '}'
{
    var name;
    if (p_name) {
        name = p_name[1];
    }
    return ast({
        ast_type: "Class",
        ast_title: "$",
        ast_childs: {
            Name: name,
            Type: type,
            Block: block,
        }
    });
}

ClassExpression "ClassExpression" =
    content: (
        Function
        / Class
    )
{
    return ast({
        ast_type: "Expression",
        ast_title: "()",
        ast_childs: {
            Content: content,
        },
    });
}

ClassStatement =
    isStatic: ("static" __)?
    content:(
        Variable
        / ClassExpression
    )
{
    return ast({
        ast_type: "Statement",
        ast_title: "_",
        ast_childs: {
            Content: content,
        },
        ast_datas: {
            isStatic: !!isStatic,
        },
    });
}

ClassBlock =
    _ statements :(ClassStatement Delimiter+)*
    _ lastStatement :ClassStatement?
    _ Delimiter*
{
    var list = [];
    statements.forEach(function (statement) {
        if (statement[0]) {
            list.push(statement[0]);
        }
    });
    if (lastStatement) {
        list.push(lastStatement);
    }
    return ast({
        ast_type: "Block",
        ast_title: "{}",
        ast_childs: list
    });
}
