import boom from "boom";

export default (ctx) => {
    if (ctx.queueItem.error[502]) {
        ctx.queueItem.error[502]++;
    } else {
        ctx.queueItem.error[502] = 1;
    }
    throw boom.notFound(ctx.uri);
}