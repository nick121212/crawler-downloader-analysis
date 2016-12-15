import boom from "boom";

export default (ctx) => {
    if (ctx.queueItem.error[404]) {
        ctx.queueItem.error[404]++;
    } else {
        ctx.queueItem.error[404] = 200;
    }
    throw boom.notFound(ctx.uri);
}