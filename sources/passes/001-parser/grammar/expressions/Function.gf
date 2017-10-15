
Function "Function" =
    ("fn"/"function")
    p_name :(__ Identifier)?
    p_type :(_ Typed)?
    _ params :FunctionParams?
    _ '{'
    _ block: Block
    _ '}'
{
    var name;
    if (p_name) {
        name = p_name[1];
    }
    var type;
    if (p_type) {
        type = p_type[1];
    }
    return ast({
        ast_type: "Function",
        ast_title: "fn",
        ast_childs: {
            Name: name,
            Type: type,
            Params: params,
            Block: block,
        },
    });
}

FunctionParams "Function Params" =
    '('
    params: (_ FunctionParam _ ',')*
    lastParam: (_ FunctionParam)?
    _ ')'
{
    var list = [];
    params.forEach(function (param) {
        list.push(param[1]);
    });
    if (lastParam) {
        list.push(lastParam[1]);
    }
    return ast({
        ast_type: "FunctionParams",
        ast_title: "x" + list.length + "",
        ast_childs: list,
    });
}

FunctionParam = 
    name :Identifier
    p_type :(_ Typed)?
    p_variadic: (_ "...")?
{
    var type = null;
    if (p_type) {
        type = p_type[1];
    }
    var variadic = false;
    if (p_variadic) {
        variadic = true;
    }
    return ast({
        ast_type: "FunctionParam",
        ast_childs: {
            Name: name,
            Type: type,
        },
        ast_datas: {
            variadic: variadic,
        },
    });
}
