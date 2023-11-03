import type { ServiceConfig } from "@vtex/api";
import type { Logger } from "../../types/logger";
import { enhancedLoggerInjectionMiddlewareFactory } from "./enhanced-logger-injection-middleware-factory";

export function injectEnhancedLoggerToRoutes(
  routes: ServiceConfig<any, any, any>["routes"],
  { logger }: { logger?: Logger }
) {
  if (!routes) {
    return routes;
  }

  const injectionLoggerMiddleware = enhancedLoggerInjectionMiddlewareFactory({
    logger,
  });

  const enhancedRoutes: typeof routes = {};

  for (const [name, handler] of Object.entries(routes)) {
    enhancedRoutes[name] = Array.isArray(handler)
      ? [injectionLoggerMiddleware, ...handler]
      : [injectionLoggerMiddleware, handler];
  }

  return enhancedRoutes;
}
