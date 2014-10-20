var stripIndent = require('strip-indent');

module.exports = parse;


function parse(buffer) {
  var source = buffer.toString();
  return source.replace(/\/\/! start compile (.*)[\s\S]*?\/\/! end compile/g, function(all, options) {
    options = JSON.parse(options);
    var compiled = compile(
      options.name,
      options.maybeGenerator,
      all.split('\n').slice(1, -1).join('\n')
    );
    return compiled;
  })
}



function compile(name, maybeGenerator, code) {
// turn this
//        function each() {
//            if (window.something) {
//                var res = yield* fn(arg1, arg2);
//            }
//        }
// into this
//        function each() {
//            if (logen.isGenerator(maybeGenerator)) {
//                return function *each() {
//                    if (window.something) {
//                        var res = yield* fn(arg1, arg2);
//                    }
//                }
//            } else {
//                if (window.something) {
//                    var res = fn(arg1, arg2);
//                }
//            }
//        }

  code = stripIndent(code.toString().split('\n').join('\n'));
  return [
    //'function ' + name + ' () {',
      'if (logen.isGenerator(' + maybeGenerator + ')) {',
    '    return function *' + name + '() {',
    '      ' + code.split('\n').join('\n      '),
    '    }',
    '  } else {',
    '    ' + code.replace(/yield\s*\*\s*/g, '').split('\n').join('\n    '),
    '  }',
    //'}'
  ].join('\n');

}

