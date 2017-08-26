module.exports = [
 /*
    {
        label : 'xxxxxxxxxxxxxx',
        description : 'xxxxxxxxxxxxxxxxxxx',
        check : function (input) {
            return true;
        },
        transform : function (input, uri) {
            return input;
        }
    },
 */
    {
        label : 'UserExample',
        description : 'User EndeStr example at file OS_USER_DIR/.vscode/endeStr.js',
        check : function (input) {
            return true;
        },
        transform : function (input, uri) {
            return '(' + input + ')';
        }
    },
    {
        label : 'humpToUnderline',
        description : 'AaBb to aa_bb',
        check : function (input) {
            return true;
        },
        transform : function (input, uri) {
          var sR = input.replace(/[A-Z]/g, function (s) {
            return '_' + s.toLowerCase();
          });

          if(input[0] !== '_' && sR[0] === '_') {
            sR = sR.slice(1);
          }

          return sR;
        }
    },
    {
        label : 'toUpperCase',
        description : 'abc to ABC',
        check : function (input) {
            return true;
        },
        transform : function (input, uri) {
          return input.toUpperCase();
        }
    },
    {
        label : 'toLowerCase',
        description : 'ABC to abc',
        check : function (input) {
            return true;
        },
        transform : function (input, uri) {
          return input.toLowerCase();
        }
    },
    
];