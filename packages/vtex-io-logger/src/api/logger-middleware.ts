import { enhancedLoggerInjectionMiddlewareFactory } from "../core/injection/enhanced-logger-injection-middleware-factory";
import type { Ollie } from "../types/ollie";

export function loggerMiddleware({ logger }: Ollie.Options = {}) {
  return enhancedLoggerInjectionMiddlewareFactory({
    logger,
  });
}
