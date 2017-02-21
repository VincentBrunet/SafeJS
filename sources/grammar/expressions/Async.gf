
Async "Async" =
    ("async"/"async")
    _ type :Typed?
    _ params :AsyncParams?
    _ '{'
    _ block: Block
    _ '}'
{
    return ast({
        ast_type: "Async",
        ast_title: "async",
        ast_childs: {
            Type: type,
            Params: params,
            Block: block,
        },
    });
}

AsyncParams "Async Params" =
    '('
    params: (_ AsyncParam _ ',')*
    lastParam: (_ AsyncParam)?
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
        ast_type: "AsyncParams",
        ast_title: "x" + list.length + "",
        ast_childs: list,
    });
}

AsyncParam = 
    name :Identifier
{
    return ast({
        ast_type: "AsyncParam",
        ast_childs: {
            Name: name,
        },
    });
}
