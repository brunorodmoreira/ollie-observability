import type { ServiceContext } from "@vtex/api";
import type { Logger } from "../../types/logger";
import type { ParamsContextWithOllie } from "../../types/service";

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
}: {
  logger?: Logger;
}) {
  const middleware = function enhancedLoggerInjectionMiddleware(
    ctx: ServiceContext<any, any, ParamsContextWithOllie>,
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
