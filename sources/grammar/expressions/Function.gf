
Function "Function" =
    ("fn"/"function")
    p_name :(__ Identifier)?
    _ type :Typed?
    _ params :FunctionParams?
    _ '{'
    _ block: Block
    _ '}'
{
    var name;
    if (p_name) {
        name = p_name[1];
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
        //ast_datas: {
        //},
        //name: name,
        //params: params,
        //block: block,
    });
}


FunctionParams "Function Params" =
    '('
    _ params: (_ FunctionParam ',')*
    _ lastParam: FunctionParam?
    _ ')'
{
    var list = [];
    params.forEach(function (param) {
        list.push(param[1]);
    });
    if (lastParam) {
        list.push(lastParam);
    }
    return ast({
        ast_type: "FunctionParams",
        ast_title: "x" + list.length + "",
        ast_childs: list,
    });
}

FunctionParam = 
    name :Identifier
    _ type :Typed?
{
    return ast({
        ast_type: "FunctionParam",
        ast_childs: {
            Name: name,
            Type: type,
        },
    });
}