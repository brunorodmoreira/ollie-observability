import type {
  IOClients,
  ParamsContext,
  RecorderState,
  ServiceConfig,
} from "@vtex/api";
import { ILogger } from "../../types/logger";
import { enhancedLoggerInjectionMiddlewareFactory } from "../middlewares/enhancedLoggerInjectionMiddlewareFactory";

export function injectEnhancedLoggerToRoutes<
  T extends IOClients,
  U extends RecorderState,
  V extends ParamsContext
>(routes: ServiceConfig["routes"], { logger }: { logger?: ILogger }) {
  if (!routes) {
    return routes;
  }

  const injectionLoggerMiddleware = enhancedLoggerInjectionMiddlewareFactory({
    logger,
  });

  const enhancedRoutes: typeof routes = {};

  for (const [name, handler] of Object.entries(routes)) {
    if (Array.isArray(handler)) {
      enhancedRoutes[name] = [injectionLoggerMiddleware, ...handler];
    } else {
      enhancedRoutes[name] = [injectionLoggerMiddleware, handler];
    }
  }

  return enhancedRoutes;
}
