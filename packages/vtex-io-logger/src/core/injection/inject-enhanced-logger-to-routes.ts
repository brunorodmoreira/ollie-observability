import type { EventHandler, ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionEventsMiddlewareFactory, enhancedLoggerInjectionMiddlewareFactory } from "./enhanced-logger-injection-middleware-factory";

export function injectEnhancedLoggerToRoutes(
  routes: ServiceConfig<any, any, any>["routes"],
  options: Ollie.Options,
  events?: ServiceConfig<any, any, any>["events"],
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
  const enhancedEvents: typeof events = {};

  if (events) {
    const injectionLoggerEventsMiddleware = enhancedLoggerInjectionEventsMiddlewareFactory(options);

    for (const [name, handler] of Object.entries(events)) {
      const middlewareArray: EventHandler<any, any>[] = Array.isArray(handler)
        ? [injectionLoggerEventsMiddleware, ...handler]
        : [injectionLoggerEventsMiddleware, handler ];

      enhancedEvents[name] = middlewareArray;
    }
  }

  return enhancedRoutes;
}


