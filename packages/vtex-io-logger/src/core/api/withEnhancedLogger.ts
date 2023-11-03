import type { IOClients, ParamsContext, RecorderState } from "@vtex/api";
import { Service } from "@vtex/api";
import { ILogger } from "../../types/logger";
import { injectEnhancedLoggerToRoutes } from "../injection/injectEnhancedLoggerToRoutes";
import { instrumentRoutes } from "../instrumentation/routes/instrumentRoutes";

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
