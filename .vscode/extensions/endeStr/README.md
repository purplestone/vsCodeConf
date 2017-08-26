# endeStr README

This is a extension for string conversion.

## Features

* Slash
* FilePath to relative path from current file
* Merge lines
* Creat UUID
* Base64
* JSON format
* MD5
* HTML Entities


You can define string convert function by your self at file:  `OS_USER_DIR/.vscode/endeStr.js`

Like this:
```js
    transform : function (input, uri) {
        return 'select (' + input + ') from [' + uri.path.slice(1) + ']';
    }
```


## Extension Usage

Press `ctrl+alt-e` to call the menu an select a conversion type you want.

Command activationEvents : `extension.endeStr`

## Other

This extension code base by :marketplace.visualstudio.com/items?itemName=mitchdenny.ecdc

