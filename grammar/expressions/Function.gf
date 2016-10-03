
Function "Function" =
    ("fn"/"function") __
    _ name :Identifier?
    _ typed :Typed?
    _ params :FunctionPartParams?
    _ '{'
    _ block: Block
    _ '}'
{
    return {
        ast_type: "Function",
        ast_title: "function",
        ast_childs: {
            Name: name,
            Typed: typed,
            Params: params,
            Block: block,
        },
        ast_datas: {

        },
        name: name,
        params: params,
        //block: block,
    };
}


FunctionPartParams "Function Params" =
    _ '('
    _ params: (FunctionPartParam ',')*
    _ lastParam: FunctionPartParam?
    _ ')'
    _
{
    var list = [];
    params.forEach(function (param) {
        list.push(param[0]);
    });
    if (lastParam) {
        list.push(lastParam);
    }
    return {
        ast_type: "FunctionPartParams",
        ast_title: "x" + list.length + "",
        ast_childs: list,
    };
}

FunctionPartParam = 
    _ name :Identifier
    _ typed :Typed?
{
    return {
        ast_type: "FunctionPartParam",
        ast_childs: {
            Name: name,
            Typed: typed,
        },
    };
}