import type { IOClients, ParamsContext, RecorderState } from "@vtex/api";
import { Service } from "@vtex/api";
import { injectEnhancedLoggerToEvents } from "../core/injection/inject-enhanced-logger-to-events";
import { injectEnhancedLoggerToRoutes } from "../core/injection/inject-enhanced-logger-to-routes";
import { instrumentEvents } from "../core/instrumentation/routes/instrument-events";
import { instrumentRoutes } from "../core/instrumentation/routes/instrument-routes";
import type { Ollie } from "../types/ollie";

export function withFullLogger<
  T extends IOClients,
  U extends RecorderState,
  V extends ParamsContext
>(service: Service<T, U, V>, options: Ollie.Options = {}) {
  const { config } = service;
  let routes, events

  if (config.routes) {
    routes = injectEnhancedLoggerToRoutes(config.routes, options);
    routes = instrumentRoutes(routes);
  }

  if (config.events) {
    events = injectEnhancedLoggerToEvents(config.events, options);
    events = instrumentEvents(events, options.logger);
  }

  return new Service({
    ...config,
    routes,
    events,
  });
}

