{
    var ast = options.util.makeAST(location, options);

    function LeftToRightOp(head, tails) {
        if (tails.length <= 0) {
            return head;
        }
        var e1 = head;
        tails.forEach(function (tail) {
            var op = tail[1].trim();
            var e2 = tail[3];
            e1 = ast({
                ast_type: "Operation",
                ast_title: op,
                ast_childs: {
                    E1: e1,
                    E2: e2,
                },
                ast_datas: {
                    op: op,
                },
            });
        });
        return e1;
    }
    function RightToLeftOp(head, tails) {
        if (tails.length <= 0) {
            return head;
        }
        var tail = tails[0];
        var e1 = head;
        var op = tail[1].trim();
        var e2 = RightToLeftOp(tail[3], tails.slice(1));
        return ast({
            ast_type: "Operation",
            ast_title: op,
            ast_childs: {
                E1: e1,
                E2: e2,
            },
            ast_datas: {
                op: op,
            },
        });
    }
}
