import type { ServiceContext } from "@vtex/api";
import type { Ollie } from "../../types/ollie";
import { interceptNativeLogger } from "../interceptors/intercept-native-logger";

export function enhancedLoggerInjectionGraphqlFactory(resolver: unknown, {
    logger,
    interceptVtexLogger,
}: Ollie.Options) {
    const oldResolver = resolver;
    const newResolver = function enhancedLoggerInjectionMiddleware(
        _: unknown,
        args: unknown,
        ctx: ServiceContext
    ) {
        ctx.ollie = {
            logger: logger || ctx.vtex.logger,
        };

        if (logger && ctx.ollie.logger !== ctx.vtex.logger && interceptVtexLogger) {
            interceptNativeLogger(ctx.vtex, { logger });
        }

        return oldResolver(_, args, ctx);
    };

    newResolver.__loggerInjectionMiddleware = true;

    return newResolver;
}