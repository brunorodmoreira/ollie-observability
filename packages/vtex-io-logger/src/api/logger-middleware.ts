import { enhancedLoggerInjectionMiddlewareFactory } from "../core/injection/enhanced-logger-injection-middleware-factory";
import type { Ollie } from "../types/ollie";

export function loggerMiddleware({ logger }: { logger: Ollie.Logger }) {
  return enhancedLoggerInjectionMiddlewareFactory({
    logger,
  });
}
