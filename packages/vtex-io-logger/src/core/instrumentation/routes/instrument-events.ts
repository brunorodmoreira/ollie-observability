import type { ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../../types/ollie";
import { addItemToPosition } from "../../../utils/arrays";
import { fullLoggingEventMiddlewareFactory } from "./full-logging-middleware-factory";

export function instrumentEvents(events: ServiceConfig["events"], logger?: Ollie.Logger) {
  if (!events) {
    return events;
  }

  const enhancedRoutes: typeof events = {};

  for (const [name, handlers] of Object.entries(events)) {
    if (!Array.isArray(handlers)) {
      logger?.info({ message: `Route ${name} is not an array. This could be to not be inject the logger.` })
      throw new Error(
        `Route ${name} is not an array. This could be to not be inject the logger.`
      );
    }

    const fullLoggingMiddleware = fullLoggingEventMiddlewareFactory();
    logger?.info({ message: "finish fullLoggingMiddleware", fullLoggingMiddleware })
    enhancedRoutes[name] = addItemToPosition(
      handlers,
      fullLoggingMiddleware,
      0
    );
  }

  return enhancedRoutes;
}
