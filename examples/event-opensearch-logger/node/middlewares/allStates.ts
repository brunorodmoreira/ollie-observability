export async function allStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  // eslint-disable-next-line no-console
  console.log(ctx.body)

  await next()
}
