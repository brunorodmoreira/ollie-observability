import type { EventContext, ServiceContext } from "@vtex/api";
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
      interceptNativeLogger(ctx.vtex, { logger });
    }

    return next();
  };

  middleware.__loggerInjectionMiddleware = true;

  return middleware;
}

export function enhancedLoggerInjectionEventsMiddlewareFactory({
  logger,
  interceptVtexLogger,
}: Ollie.Options) {
  const middleware = function enhancedLoggerInjectionEventsMiddleware(
    ctx: EventContext<any, any>,
    next: () => Promise<any>
  ) {
    ctx.clients.ollie = {
      logger: logger || ctx.vtex.logger,
    };

    if (logger && ctx.clients.ollie.logger !== ctx.vtex.logger && interceptVtexLogger) {
      interceptNativeLogger(ctx.vtex, { logger });
    }

    return next();
  };

  middleware.__loggerInjectionMiddleware = true;

  return middleware;
}