
CommentOneLine =
    "//"
    content :[^\r^\n]*
    ("\n"/"\r"/!.)
{
    /*
    var value = content.join("");
    return ast({
        ast_type: "CommentOneLine",
        ast_title: value,
    });
    */
}

CommentMultiLine =
    "/*"
    _array: "\0"* // Artificially create an empty array usable as variable
    &{
        _array.splice(0, _array.length);
        return true;
    }
    content: $(c:. &{
        var idx = _array.length - 1;
        if (_array[idx] == '/'
            && _array[idx - 1] == '*') {
            return false;
        }
        _array.push(c);
        return true;
    })*
{
    /*
    var value = content;
    return ast({
        ast_type: "CommentMultiLine",
        ast_title: value,
    });
    */
}

Comment =
    CommentOneLine / CommentMultiLine
{
    /*
    return ast({
        ast_type: "Comment",
        ast_title: "",
    });
    */
}
