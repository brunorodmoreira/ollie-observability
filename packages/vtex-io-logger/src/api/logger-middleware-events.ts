import { enhancedLoggerInjectionEventsMiddlewareFactory } from "../core/injection/enhanced-logger-injection-middleware-factory";
import type { Ollie } from "../types/ollie";

export function loggerMiddlewareEvents(options: Ollie.Options = {}) {
    return enhancedLoggerInjectionEventsMiddlewareFactory(options);
}