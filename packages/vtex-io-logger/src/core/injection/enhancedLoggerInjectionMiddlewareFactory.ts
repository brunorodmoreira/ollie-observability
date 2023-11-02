import { ServiceContext } from "@vtex/api";
import { ILogger } from "../../types/logger";
import { ParamsContextWithEnhancedLogger } from "../../types/service";

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
}: {
  logger?: ILogger;
}) {
  return function enhancedLoggerInjectionMiddleware(
    ctx: ServiceContext,
    next: () => Promise<any>
  ) {
    (
      ctx as ServiceContext<any, any, ParamsContextWithEnhancedLogger>
    ).enhancedLogger = logger || ctx.vtex.logger;

    return next();
  };
}
