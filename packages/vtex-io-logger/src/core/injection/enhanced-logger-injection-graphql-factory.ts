import type { ServiceContext } from "@vtex/api";
import type { Ollie, ParamsContextWithOllie } from "../../types/ollie";
import { interceptNativeLogger } from "../interceptors/intercept-native-logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enhancedLoggerInjectionGraphqlFactory(resolver: any, {
    logger,
    interceptVtexLogger,
}: Ollie.Options) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const oldResolver = resolver;
    const newResolver = function enhancedLoggerInjectionMiddleware(
        _: unknown,
        args: unknown,
        ctx: ServiceContext<any, any, ParamsContextWithOllie>
    ) {
        ctx.ollie = {
            logger: logger || ctx.vtex.logger,
        };

        if (logger && ctx.ollie.logger !== ctx.vtex.logger && interceptVtexLogger) {
            interceptNativeLogger(ctx.vtex, { logger });
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return oldResolver(_, args, ctx);
    };

    newResolver.__loggerInjectionMiddleware = true;

    return newResolver;
}