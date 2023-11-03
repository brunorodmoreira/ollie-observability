import type { RouteHandler, ServiceConfig } from "@vtex/api";
import { addItemToPosition } from "../../../utils/arrays";
import { fullLoggingMiddlewareFactory } from "./full-logging-middleware-factory";

export function instrumentRoutes(routes: ServiceConfig["routes"]) {
  if (!routes) {
    return routes;
  }

  const enhancedRoutes: typeof routes = {};

  for (const [name, handlers] of Object.entries(routes)) {
    if (!Array.isArray(handlers)) {
      throw new Error(
        `Route ${name} is not an array. This could be to not be inject the logger.`
      );
    }

    const indexOfInjectedLogger = handlers.findIndex(
      (handler: RouteHandler & { __loggerInjectionMiddleware?: boolean }) =>
        handler.__loggerInjectionMiddleware
    );

    if (indexOfInjectedLogger === -1) {
      throw new Error(
        `Route ${name} does not have the logger injected. This could be to not be inject the logger.`
      );
    }

    if (indexOfInjectedLogger > 0) {
      // eslint-disable-next-line no-console -- only a warning
      console.warn(
        `Route ${name} has the logger injected in a position different from the first one.`
      );
    }

    const fullLoggingMiddleware = fullLoggingMiddlewareFactory();

    enhancedRoutes[name] = addItemToPosition(
      handlers,
      fullLoggingMiddleware,
      indexOfInjectedLogger + 1
    );
  }

  return enhancedRoutes;
}
