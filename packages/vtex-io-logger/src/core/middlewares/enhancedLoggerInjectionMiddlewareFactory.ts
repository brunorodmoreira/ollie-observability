import { ServiceContext } from "@vtex/api";
import { ILogger } from "../../types/logger";
import { ParamsContextWithEnhancedLogger } from "../../types/service";

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
}: {
  logger: ILogger;
}) {
  return function enhancedLoggerInjectionMiddleware(
    ctx: ServiceContext<any, any, ParamsContextWithEnhancedLogger>,
    next: () => Promise<any>
  ) {
    ctx.enhancedLogger = logger;

    return next();
  };
}
