"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boom = require("boom");

var _boom2 = _interopRequireDefault(_boom);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _findit = require("findit");

var _findit2 = _interopRequireDefault(_findit);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
    var finder = (0, _findit2.default)(__dirname + "/./codes");
    var files = {};

    finder.on("file", function (file, stat) {
        files[_path2.default.basename(file, ".js")] = file;
    });

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(!_lodash2.default.isObject(ctx.queueItem) || !ctx.queueItem.responseBody)) {
                                _context.next = 2;
                                break;
                            }

                            throw _boom2.default.create(601, "下载的页面数据不存在");

                        case 2:
                            // 下载的错误次数
                            ctx.queueItem.errorCount = ctx.queueItem.errorCount || 0;
                            ctx.queueItem.error = ctx.queueItem.error || {};
                            // 如果下载的状态码不是200，则报错

                            if (!(ctx.queueItem.statusCode !== 200)) {
                                _context.next = 11;
                                break;
                            }

                            if (!files[ctx.queueItem.statusCode]) {
                                _context.next = 9;
                                break;
                            }

                            _context.next = 8;
                            return require(files[ctx.queueItem.statusCode])(ctx);

                        case 8:
                            return _context.abrupt("return", _context.sent);

                        case 9:
                            ctx.queueItem.errorCount++;
                            throw _boom2.default.create(ctx.queueItem.statusCode, "下载状态码错误！");

                        case 11:

                            ctx.status.downloaderAnalysis = true;

                            _context.next = 14;
                            return next();

                        case 14:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};