{
    var ast = options.util.makeAST(location, options);

    function LeftToRightOp(head, tails, ops) {
        if (tails.length <= 0) {
            return head;
        }
        var e1 = head;
        tails.forEach(function (tail) {
            var op = tail[1].trim();
            if (ops && ops[op]) {
                op = ops[op];
            }
            var e2 = tail[3];
            e1 = ast({
                ast_type: "Operation",
                ast_title: op,
                ast_childs: {
                    E1: Expressionize(e1),
                    E2: Expressionize(e2),
                },
                ast_datas: {
                    op: op,
                },
            });
        });
        return e1;
    }
    function RightToLeftOp(head, tails, ops) {
        if (tails.length <= 0) {
            return head;
        }
        var tail = tails[0];
        var e1 = head;
        var op = tail[1].trim();
        if (ops && ops[op]) {
            op = ops[op];
        }
        var e2 = RightToLeftOp(tail[3], tails.slice(1));
        return ast({
            ast_type: "Operation",
            ast_title: op,
            ast_childs: {
                E1: Expressionize(e1),
                E2: Expressionize(e2),
            },
            ast_datas: {
                op: op,
            },
        });
    }
    function Expressionize(content) {
        if (!content) {
            return content;
        }
        if (content.ast_type == "Expression") {
            return content;
        }
        return ast({
            ast_type: "Expression",
            ast_title: "()",
            ast_childs: {
                Content: content,
            },
        });
    }
}
