import { ServiceContext } from "@vtex/api";
import { ILogger } from "../../types/logger";
import { ParamsContextWithSunstone } from "../../types/service";

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
}: {
  logger?: ILogger;
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
