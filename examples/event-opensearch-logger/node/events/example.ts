export async function example(ctx: StatusChangeContext) {
    console.log('RECEIVED EVENT', ctx.body)
    ctx.ollie.logger.info('RECEIVED EVENT', ctx.body)

    return true
}
