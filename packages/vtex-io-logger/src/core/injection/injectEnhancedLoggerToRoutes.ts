import type { ServiceConfig } from "@vtex/api";
import { ILogger } from "../../types/logger";
import { enhancedLoggerInjectionMiddlewareFactory } from "./enhancedLoggerInjectionMiddlewareFactory";

export function injectEnhancedLoggerToRoutes(
  routes: ServiceConfig<any, any, any>["routes"],
  { logger }: { logger?: ILogger }
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
