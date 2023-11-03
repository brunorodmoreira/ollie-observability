import { enhancedLoggerInjectionMiddlewareFactory } from "../core/injection/enhanced-logger-injection-middleware-factory";
import type { Logger } from "../types/logger";

export function loggerMiddleware({ logger }: { logger: Logger }) {
  return enhancedLoggerInjectionMiddlewareFactory({
    logger,
  });
}
