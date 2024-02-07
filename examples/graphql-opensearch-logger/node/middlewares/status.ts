export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { status: statusClient },
  } = ctx

  const statusResponse = await statusClient.getStatus(200)

  console.info('Status response:', statusResponse)

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getStatusWithHeaders(200)

  console.info('Status headers', headers)
  console.info('Status data:', data)

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
