function($n) {
  var root_name, root_anon_fn;
  $$A._block([function($n) {
    root_name = function root_named_fn() {};
    root_anon_fn = function() {};
    $n();
  }, function($n) {
    $$A._while([1, function($n) {
      $$A._op('@', [0, test], null, ___n);
    }], function($n) {
      var while_name, while_anon_fn;
      $$A._block([function($n) {
        while_name = function while_named_fn() {};
        while_anon_fn = function() {};
        $n();
      }, function($n) {
        $$A._condition([
          [
            [1, function($n) {
              $$A._op('@', [0, test], null, ___n);
            }],
            function($n) {
              var if_name, if_anon_fn;
              if_name = function if_named_fn() {};
              if_anon_fn = function() {};
              $n();
            }
          ]
        ], $n);
      }], $n);
    }, $n);
  }], $n);
}
