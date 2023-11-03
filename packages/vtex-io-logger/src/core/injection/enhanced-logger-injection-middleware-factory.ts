import type { ServiceContext } from "@vtex/api";
import type { Ollie } from "../../types/ollie";

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
}: {
  logger?: Ollie.Logger;
}) {
  const middleware = function enhancedLoggerInjectionMiddleware(
    ctx: ServiceContext<any, any, Ollie.ParamsContextWithOllie>,
    next: () => Promise<any>
  ) {
    ctx.ollie = {
      logger: logger || ctx.vtex.logger,
    };

    return next();
  };

  middleware.__loggerInjectionMiddleware = true;

  return middleware;
}
