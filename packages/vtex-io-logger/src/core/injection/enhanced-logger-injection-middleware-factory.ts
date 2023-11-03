import type { ServiceContext } from "@vtex/api";
import type { Logger } from "../../types/logger";
import type { ParamsContextWithSunstone } from "../../types/service";

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
}: {
  logger?: Logger;
}) {
  const middleware = function enhancedLoggerInjectionMiddleware(
    ctx: ServiceContext<any, any, ParamsContextWithSunstone>,
    next: () => Promise<any>
  ) {
    ctx.sunstone = {
      logger: logger || ctx.vtex.logger,
    };

    return next();
  };

  middleware.__loggerInjectionMiddleware = true;

  return middleware;
}
