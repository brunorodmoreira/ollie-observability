import type { ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../../types/ollie";
import { addItemToPosition } from "../../../utils/arrays";
import { fullLoggingMiddlewareFactory } from "./full-logging-middleware-factory";

export function instrumentEvents(events: ServiceConfig["events"], logger?: Ollie.Logger) {
  if (!events) {
    return events;
  }

  const enhancedEvents: typeof events = {};

  try {
    for (const [name, handlers] of Object.entries(events)) {
      if (!Array.isArray(handlers)) {
        throw new Error(
          `Route ${name} is not an array. This could be to not be inject the logger.`
        );
      }

      const fullLoggingMiddleware = fullLoggingMiddlewareFactory(logger);
      enhancedEvents[name] = addItemToPosition(
        handlers,
        fullLoggingMiddleware,
        0
      );
    }
  } catch (error) {
    logger?.info({ message: error })
  }


  logger?.info({ message: `enhancedEvents ${JSON.stringify(enhancedEvents)}.` })
  return enhancedEvents;
}
