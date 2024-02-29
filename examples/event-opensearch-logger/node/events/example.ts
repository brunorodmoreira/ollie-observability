import type { EventContextWithOllie } from "@ollie-dev/vtex-io-logger"

export async function example(ctx: EventContextWithOllie) {
    console.log('RECEIVED EVENT', ctx.body)
    console.log(ctx.body)
    ctx.ollie.logger.info('RECEIVED EVENT', ctx.body)

    return true
}
