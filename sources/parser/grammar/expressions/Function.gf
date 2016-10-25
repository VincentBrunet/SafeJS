
Function "Function" =
    "fn" // ("fn"/"function")
    p_name :(__ Identifier)?
    _ typed :Typed?
    _ params :FunctionPartParams?
    _ '{'
    _ block: Block
    _ '}'
{
    var name;
    if (p_name) {
        name = p_name[1];
    }
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
    '('
    _ params: (_ FunctionPartParam ',')*
    _ lastParam: FunctionPartParam?
    _ ')'
{
    var list = [];
    params.forEach(function (param) {
        list.push(param[1]);
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
    name :Identifier
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