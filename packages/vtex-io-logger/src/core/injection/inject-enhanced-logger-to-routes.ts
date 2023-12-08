import type { EventHandler, ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionEventsMiddlewareFactory, enhancedLoggerInjectionMiddlewareFactory } from "./enhanced-logger-injection-middleware-factory";

export function injectEnhancedLoggerToRoutes(
  routes: ServiceConfig<any, any, any>["routes"],
  events: ServiceConfig<any, any, any>["events"],
  options: Ollie.Options
) {
  if (!routes) {
    return routes;
  }

  // Assuming the middleware factory returns a compatible middleware
  const injectionLoggerMiddleware = enhancedLoggerInjectionMiddlewareFactory(options);

  const enhancedRoutes: typeof routes = {};

  for (const [name, handler] of Object.entries(routes)) {
    enhancedRoutes[name] = Array.isArray(handler)
      ? [injectionLoggerMiddleware, ...handler]
      : [injectionLoggerMiddleware, handler];
  }

  // Assuming 'events' is your original object
  const enhancedEvents: Record<string, EventHandler<any, any> | EventHandler<any, any>[]> = {};

  if (events) {
    const injectionLoggerMiddleware = enhancedLoggerInjectionEventsMiddlewareFactory(options);

    for (const [name, handler] of Object.entries(events)) {
      const middlewareArray: EventHandler<any, any>[] = Array.isArray(handler)
        ? [injectionLoggerMiddleware, ...handler]
        : [injectionLoggerMiddleware, handler as EventHandler<any, any>];

      enhancedEvents[name] = middlewareArray;
    }
  }

  return enhancedRoutes;
}


