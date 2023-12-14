import type { ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionMiddlewareFactory } from "./enhanced-logger-injection-middleware-factory";

export function injectEnhancedLoggerToRoutes(
  routes: ServiceConfig<any, any, any>["routes"],
  options: Ollie.Options
) {
  const injectionLoggerMiddleware = enhancedLoggerInjectionMiddlewareFactory(options);

  const enhancedRoutes: typeof routes = {};

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- routes is not null
  for (const [name, handler] of Object.entries(routes!)) {
    enhancedRoutes[name] = Array.isArray(handler)
      ? [injectionLoggerMiddleware, ...handler]
      : [injectionLoggerMiddleware, handler];
  }

  return enhancedRoutes;
}