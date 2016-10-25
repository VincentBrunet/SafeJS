
Class "Class" =
    "class"
    p_name :(__ Identifier)?
    _ typed :Typed?
    _ '{'
    _ block: Block
    _ '}'
{
    var name;
    if (p_name) {
        name = p_name[1];
    }
    return {
        ast_type: "Class",
        ast_title: "@",
        ast_childs: {
            Name: name,
            Typed: typed,
            Block: block,
        }
    };
}
