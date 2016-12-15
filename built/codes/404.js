"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _boom = require("boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ctx) {
    if (ctx.queueItem.error[404]) {
        ctx.queueItem.error[404]++;
    } else {
        ctx.queueItem.error[404] = 200;
    }
    throw _boom2.default.notFound(ctx.uri);
};