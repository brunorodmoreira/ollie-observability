import type { EventHandler, ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionEventsMiddlewareFactory, enhancedLoggerInjectionMiddlewareFactory } from "./enhanced-logger-injection-middleware-factory";

export function injectEnhancedLoggerToRoutes(
  routes: ServiceConfig<any, any, any>["routes"],
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

  return enhancedRoutes;
}

export function injectEnhancedLoggerToEvents(
  events: ServiceConfig<any, any, any>["events"],
  options: Ollie.Options,

) {
  if (!events) {
    return events;
  }
  // Assuming 'events' is your original object
  const enhancedEvents: typeof events = {};
  try {
    const injectionLoggerEventsMiddleware = enhancedLoggerInjectionEventsMiddlewareFactory(options);

    for (const [name, handler] of Object.entries(events)) {
      const middlewareArray: EventHandler<any, any>[] = Array.isArray(handler)
        ? [injectionLoggerEventsMiddleware, ...handler]
        : [injectionLoggerEventsMiddleware, handler];

      options.logger?.info({ message: "middlewareArray", middlewareArray })
      enhancedEvents[name] = middlewareArray;
    }
  } catch (error) {
    options.logger?.info({ message: error })
  }


  options.logger?.info({ message: "finish enhancedEvents", enhancedEvents })

  return enhancedEvents;
}


