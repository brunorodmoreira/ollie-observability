import type { ServiceConfig } from "@vtex/api";
import { addItemToPosition } from "../../../utils/arrays";
import { fullLoggingMiddlewareFactory } from "./full-logging-middleware-factory";

export function instrumentEvents(events: ServiceConfig["events"]) {
  if (!events) {
    return events;
  }

  const enhancedRoutes: typeof events = {};

  for (const [name, handlers] of Object.entries(events)) {
    if (!Array.isArray(handlers)) {
      throw new Error(
        `Route ${name} is not an array. This could be to not be inject the logger.`
      );
    }

    const fullLoggingMiddleware = fullLoggingMiddlewareFactory();

    enhancedRoutes[name] = addItemToPosition(
      handlers,
      fullLoggingMiddleware,
      0
    );
  }

  return enhancedRoutes;
}
