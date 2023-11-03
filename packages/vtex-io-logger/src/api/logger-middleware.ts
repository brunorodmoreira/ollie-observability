import { enhancedLoggerInjectionMiddlewareFactory } from "../core/injection/enhanced-logger-injection-middleware-factory";
import type { ILogger } from "../types/logger";

export function loggerMiddleware({ logger }: { logger: ILogger }) {
  return enhancedLoggerInjectionMiddlewareFactory({
    logger,
  });
}
