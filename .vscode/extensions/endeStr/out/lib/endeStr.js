var path = require('path');
var fs = require('fs');


var slash = (()=>{
    return {
        label : 'Slash',
        description : 'slash : \\ to / ',
        transform : function (input) {
            return input.replace(/\\/g, '/');
        }
    };
})();

var json = (()=>{
    return {
        label : 'JSON.stringify',
        description : 'JSON.stringify(str, 0, 4)',
        transform : function (input) {
            return JSON.stringify(JSON.parse(input), 0, 4);
        }
    };
})();

var jsSlash = (()=>{
    return {
        label : 'Js string all',
        description : 'js string \' \" : \\ to \\\\, \' to \\\', " to \\" ',
        transform : function (input) {
            return input.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/"/g, '\\"');
        }
    };
})();

var jsSlash2 = (()=>{
    return {
        label : 'Js string single',
        description : 'js string \' : \\ to \\\\, \' to \\\' ',
        transform : function (input) {
            return input.replace(/\\/g, '\\\\').replace(/'/g, '\\\'');
        }
    };
})();

var strToArray = (()=>{
    return {
        label : 'Str Line To Js Array',
        description : 'aaa\nbbb to ["aaa","bbb"]',
        transform : function (input) {
            var aS = input.split('\n');
            aS = aS.map(function (sL) {
                var oM = sL.match(/^(\s*)(.+)/);
                var s = '';
                
                if (oM) {
                    s = oM[1] + "'" + jsSlash.transform(oM[2]) + "',";
                }

                return s;
            });
            return aS.join('\n');
        }
    };
})();

var strToArraySaveTab = (()=>{
    return {
        label : 'Str Line To Js Array Save tab',
        description : 'aaa\n\tbbb to ["aaa","\tbbb"]',
        transform : function (input) {
            var aS = input.split('\n');
            aS = aS.map(function (sL) {
                var s = sL;
                if (~input.indexOf('\n')) {
                    s = s.replace(/\r/g, '');
                }
                
                s = '"' + jsSlash.transform(s) + '",';

                return s;
            });
            return aS.join('\n');
        }
    };
})();

var relativeFile = (()=>{
    return {
        label : 'Relative path',
        description : 'Relative path of current file',
        transform : function (input, uri) {
            input = slash.transform(input);
            var sFromPath = uri.path.slice(1);
            sFromPath = sFromPath.split('/');
            sFromPath.pop();
            sFromPath = sFromPath.join('/');
            return slash.transform(path.relative(sFromPath, input));
        }
    };
})();

var delMoreBr = (()=>{
    return {
        label : 'Del more br',
        description : 'Del series br there are two and more',
        transform : function (input, uri) {
            var s = input;
            if (~input.indexOf('\n')) {
                s = s.replace(/\r/g, '');
            }
            var s = s.replace(/\n+/g, '\n');
            return s;
        }
    };
})();

var mergeLines = (()=>{
    return {
        label : 'Merge lines',
        description : 'More lines to one line',
        transform : function (input, uri) {
            var s = input;
            s = s.replace(/\r/g, '');
            s = s.split('\n');
            s = s.map(function (s) {
                return s.trim();
            });
            return s.join('');
        }
    };
})();

var UUID = (()=>{
    return {
        label : 'UUID',
        description : 'Create a UUID',
        transform : function (input, uri) {
            return createUUID();
        }
    };
})();


/*
var xxxxxxxx = (()=>{
    return {
        label : 'xxxxxxxxxxxxxx',
        description : 'xxxxxxxxxxxxxxxxxxx',
        check : function (input) {
            return true;
        },
        transform : function (input, uri) {
            return input;
        }
    };
})();
*/

var aShow = [
    slash,
    json,
    jsSlash2,
    jsSlash,
    strToArray,
	strToArraySaveTab,
    relativeFile,
    delMoreBr,
    mergeLines,
    UUID,
];

aShow = getUserConf().concat(aShow);

module.exports = aShow.map(function (o) {
    o.description = o.description || '';
    o.check = o.check || function () {return true;};
    return o;
});


function createUUID(sGap) {
	var sUUID = '';
	sGap = sGap || '';

	while(sUUID.length < 32) {
		sUUID += Math.floor(Math.random()*36).toString(36);
	}
	var aS = sUUID.split('');
	aS = [
		aS.splice(0,8).join(''),
		aS.splice(0,4).join(''),
		aS.splice(0,4).join(''),
		aS.splice(0,4).join(''),
		aS.slice(0).join('')
	];
	sUUID = aS.join(sGap);
	//print_r(aS.join('-'));

	return sUUID;
}

function getUserConf() {
    var aR = [];
    var sEndeConfFile = path.join(__dirname, '../../../../endeStr.js');
    try {
        if (!fs.existsSync(sEndeConfFile)) {
            fs.writeFileSync(sEndeConfFile, [
                'module.exports = [',
                ' /*',
                '    {',
                '        label : \'xxxxxxxxxxxxxx\',',
                '        description : \'xxxxxxxxxxxxxxxxxxx\',',
                '        check : function (input) {',
                '            return true;',
                '        },',
                '        transform : function (input, uri) {',
                '            return input;',
                '        }',
                '    },',
                ' */',
                '    {',
                '        label : \'UserExample\',',
                '        description : \'User EndeStr example at file OS_USER_DIR/.vscode/endeStr.js\',',
                '        check : function (input) {',
                '            return true;',
                '        },',
                '        transform : function (input, uri) {',
                '            return \'(\' + input + \')\';',
                '        }',
                '    },',
                '    ',
                '];',

            ].join('\n'));
        }
        aR = require(sEndeConfFile);
    } catch (err) {}

    return aR;
}

// var s = 'aa\n\r\n\nbb\n\t\tc\r\n\nd';
// console.log(strToArraySaveTab.transform(s));

