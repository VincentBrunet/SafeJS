
Class "Class" =
    'class' __
    _ name :Identifier?
    _ typed :Typed?
    _ '{'
    _ block: Block
    _ '}'
{
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
