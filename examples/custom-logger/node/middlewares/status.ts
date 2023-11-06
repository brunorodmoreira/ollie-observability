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

  ctx.status = responseStatus;
  ctx.body = data;
  ctx.set("Cache-Control", headers["cache-control"]);

  await next();
}
