"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_fs2.default.exists('./logs.txt', function (exists) {
    if (!exists) {
        _fs2.default.appendFile('./logs.txt', '', function (err) {
            if (err) {
                //console.log(err);
            }
        });
    }
});
var writeStream = _fs2.default.createWriteStream('./logs.txt', {
    "flags": "w",
    "encoding": "utf8",
    "mode": 438,
    "autoClose": true
});

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        writeStream.on('open', function () {
            console.log('-- log file opened --');
        });
    }

    _createClass(Logger, [{
        key: "writeToLog",
        value: function writeToLog(obj) {
            console.log('-- write to log --');
            obj['timestamp'] = new Date();
            var str = JSON.stringify(obj, null, 4);
            writeStream.write(str + '\n', 'utf8', function (err) {
                if (err) {
                    //console.log(err);
                }
            });
        }
    }]);

    return Logger;
}();

exports._logger = Logger;