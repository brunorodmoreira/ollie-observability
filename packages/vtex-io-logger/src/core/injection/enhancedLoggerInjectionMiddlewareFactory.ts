import { ServiceContext } from "@vtex/api";
import { ILogger } from "../../types/logger";
import { ParamsContextWithEnhancedLogger } from "../../types/service";

interface LoggerInjectionMiddleware extends Function {
  (ctx: ServiceContext, next: () => Promise<any>): Promise<void>;
  __loggerInjectionMiddleware?: boolean;
}

export function enhancedLoggerInjectionMiddlewareFactory({
  logger,
}: {
  logger?: ILogger;
}): LoggerInjectionMiddleware {
  const middleware = function enhancedLoggerInjectionMiddleware(
    ctx: ServiceContext,
    next: () => Promise<any>
  ) {
    (
      ctx as ServiceContext<any, any, ParamsContextWithEnhancedLogger>
    ).enhancedLogger = logger || ctx.vtex.logger;

    return next();
  };

  middleware.__loggerInjectionMiddleware = true;

  return middleware;
}
