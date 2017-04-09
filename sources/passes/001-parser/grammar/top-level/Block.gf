
Block =
    _ statements :(Statement Delimiter+)*
    _ lastStatement :Statement?
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

/*
 * A little bit tricky,
 * define possible statement deliters ('\n' or ';' mostly)
 */
Delimiter =
    $(__n/__s) _
{
    return ast({
        ast_type: "Delimiter",
    });
}
__n "Line Break"
  = ___* [\n\r]+ Comment*
{
    return ast({
        ast_type: "Whitespace",
    });
}
__s "';'"
  = ___* ";"+ Comment*
{
    return ast({
        ast_type: "Statement End",
    });
}
___
  = (Comment/[ \t])+
