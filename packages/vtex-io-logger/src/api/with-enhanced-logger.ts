import type { IOClients, ParamsContext, RecorderState } from "@vtex/api";
import { Service } from "@vtex/api";
import { injectEnhancedLoggerToRoutes } from "../core/injection/inject-enhanced-logger-to-routes";
import { instrumentRoutes } from "../core/instrumentation/routes/instrument-routes";
import type { ILogger } from "../types/logger";

interface Options {
  logger?: ILogger;
}

export function withEnhancedLogger<
  T extends IOClients,
  U extends RecorderState,
  V extends ParamsContext
>(service: Service<T, U, V>, { logger }: Options = {}) {
  const { config } = service;

  let routes = injectEnhancedLoggerToRoutes(config.routes, { logger });

  routes = instrumentRoutes(routes);

  return new Service({
    ...config,
    routes,
  });
}
