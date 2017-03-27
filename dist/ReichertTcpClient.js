"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = require("net");

var _net2 = _interopRequireDefault(_net);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Logger = require("./Logger");

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PORT = 9001;
var IP = '10.0.0.158';
var ReconnectCount = 0;

var ReichertTcpClient = function () {
    function ReichertTcpClient() {
        _classCallCheck(this, ReichertTcpClient);

        this.client = null;
        this.init();
        this.logger = new _Logger2.default._logger();
    }

    _createClass(ReichertTcpClient, [{
        key: "connect",
        value: function connect() {
            var _this = this;

            this.client.connect(PORT, IP, function () {
                console.log('-- connected to server -- ');
            });
            this.client.on('connect', function () {
                _this.client.on('data', function (data) {
                    if (data.search('# you are now on the IOE-Command-Interface') !== -1) {
                        _this.write('login api api');
                    } else if (data.search('# welcome api') !== -1) {
                        _this.write('context client 1');
                    } else if (data.search('# context = CLIENT') !== -1) {
                        _this.write('main.action.login 0');
                    } else if (data.search('#') !== -1) {
                        //
                    } else {
                        console.log(' -- data received -- ');
                        console.log(_this.client.bytesRead);
                        console.log(data);
                        var arr = data.split(/\n\r/);
                        console.log(arr);
                    }
                });
            });

            this.client.on('close', function (err) {
                console.log('connection is closed');
                // this.client.destroy();
                _this.init();
            });
            this.client.on("end", function () {});
        }
    }, {
        key: "init",
        value: function init() {
            var _this2 = this;

            this.client = new _net2.default.Socket();
            //console.log(this);
            this.client.setEncoding('utf8');
            this.connect();

            this.client.on("error", function (err) {
                //console.log(err);
                _this2.logger.writeToLog(err);
                //console.log(err);
            });
        }
    }, {
        key: "write",
        value: function write(str) {
            this.client.write(str + ' ' + "\r\n");
        }
    }]);

    return ReichertTcpClient;
}();

exports.Rtc = ReichertTcpClient;