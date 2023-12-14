/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { EventHandler, ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionEventsMiddlewareFactory } from "./enhanced-logger-injection-middleware-factory";

export function injectEnhancedLoggerToEvents(
  events: ServiceConfig<any, any, any>["events"],
  options: Ollie.Options,

) {
  const enhancedEvents: typeof events = {};
  try {
    const injectionLoggerEventsMiddleware = enhancedLoggerInjectionEventsMiddlewareFactory(options);

    for (const [name, handler] of Object.entries(events!)) {

      const middlewareArray: EventHandler<any, any>[] = Array.isArray(handler)
        ? [injectionLoggerEventsMiddleware, ...handler]
        : [injectionLoggerEventsMiddleware, handler];

      if (middlewareArray.length === 0) {
        enhancedEvents[name] = events![name];
      } else {
        enhancedEvents[name] = middlewareArray;
      }

    }

  } catch (error) {
    options.logger?.error({ message: error })
  }

  return enhancedEvents;
}


