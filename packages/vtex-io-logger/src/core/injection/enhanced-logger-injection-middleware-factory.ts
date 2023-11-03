import type { ServiceContext } from "@vtex/api";
import type { Ollie, ParamsContextWithOllie } from "../../types/ollie";
import { interceptNativeLogger } from "../interceptors/intercept-native-logger";

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
  interceptVtexLogger,
}: Ollie.Options) {
  const middleware = function enhancedLoggerInjectionMiddleware(
    ctx: ServiceContext<any, any, ParamsContextWithOllie>,
    next: () => Promise<any>
  ) {
    ctx.ollie = {
      logger: logger || ctx.vtex.logger,
    };

    if (logger && ctx.ollie.logger !== ctx.vtex.logger && interceptVtexLogger) {
      interceptNativeLogger(ctx, { logger });
    }

    return next();
  };

  middleware.__loggerInjectionMiddleware = true;

  return middleware;
}
