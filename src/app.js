import boom from "boom";
import _ from "lodash";
import findit from "findit";
import path from "path";

export default (options) => {
    const finder = findit(__dirname + "/./codes");
    const files = {};

    finder.on("file", (file, stat) => {
        files[path.basename(file, ".js")] = file;
    });

    return async(ctx, next) => {
        if (!_.isObject(ctx.queueItem) || !ctx.queueItem.responseBody) {
            throw boom.create(601, "下载的页面数据不存在");
        }
        // 下载的错误次数
        ctx.queueItem.errorCount = ctx.queueItem.errorCount || 0;
        ctx.queueItem.error = ctx.queueItem.error || {};
        // 如果下载的状态码不是200，则报错
        if (ctx.queueItem.statusCode !== 200) {
            if (files[ctx.queueItem.statusCode]) {
                return await require(files[ctx.queueItem.statusCode])(ctx);
            }
            ctx.queueItem.errorCount++;
            throw boom.create(ctx.queueItem.statusCode, "下载状态码错误！");
        }

        ctx.status.downloaderAnalysis = true;

        await next();
    };
}