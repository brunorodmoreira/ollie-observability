import { enhancedLoggerInjectionMiddlewareFactory } from "../core/injection/enhanced-logger-injection-middleware-factory";
import type { Ollie } from "../types/ollie";

export function loggerMiddleware(options: Ollie.Options = {}) {
  return enhancedLoggerInjectionMiddlewareFactory(options);
}
