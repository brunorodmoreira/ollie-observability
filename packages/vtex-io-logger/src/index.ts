import type { IOClients, ParamsContext, RecorderState } from "@vtex/api";
import { Service } from "@vtex/api";
import { injectEnhancedLoggerToRoutes } from "./core/injection/injectEnhancedLoggerToRoutes";
import { instrumentRoutes } from "./core/instrumentation/routes/instrumentRoutes";
import { ILogger } from "./types/logger";

interface Options {
  logger?: ILogger;
}

export function withEnhancedLogger(
  service: Service<IOClients, RecorderState, ParamsContext>,
  { logger }: Options
) {
  const { config } = service;

  let routes = injectEnhancedLoggerToRoutes(config.routes, { logger });

  routes = instrumentRoutes(routes);

  return new Service({
    ...config,
    routes,
  });
}
