import boom from "boom";

export default (ctx) => {
    if (ctx.queueItem.error[405]) {
        ctx.queueItem.error[405]++;
    } else {
        ctx.queueItem.error[405] = 1;
    }

    throw boom.notFound(ctx.uri);
}