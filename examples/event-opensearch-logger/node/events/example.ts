export async function example(ctx: StatusChangeContext) {
    console.log('RECEIVED EVENT', ctx.body)
    console.log(ctx.ollie)
    ctx.ollie.logger.info('RECEIVED EVENT', ctx.body)

    return true
}
