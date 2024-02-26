export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: { status: statusClient },
    ollie: { logger },
  } = ctx;

  logger.info(`Calling status with code ${code}`);

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getStatusWithHeaders(code);

  const abc = await ctx.clients.events.sendEvent('', 'send-event', {
    status: responseStatus,
  })
  console.log(abc)

  ctx.status = responseStatus;
  ctx.body = data;
  ctx.set("Cache-Control", headers["cache-control"]);



  await next();
}
