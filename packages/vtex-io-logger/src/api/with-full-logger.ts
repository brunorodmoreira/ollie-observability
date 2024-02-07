import type { IOClients, ParamsContext, RecorderState } from "@vtex/api";
import { Service } from "@vtex/api";
import { injectEnhancedLoggerToEvents } from "../core/injection/inject-enhanced-logger-to-events";
import { injectEnhancedLoggerToGraphql } from "../core/injection/inject-enhanced-logger-to-graphql";
import { injectEnhancedLoggerToRoutes } from "../core/injection/inject-enhanced-logger-to-routes";
import { instrumentEvents } from "../core/instrumentation/events/instrument-events";
import { instrumentRoutes } from "../core/instrumentation/routes/instrument-routes";
import type { Ollie } from "../types/ollie";

export function withFullLogger<
  T extends IOClients,
  U extends RecorderState,
  V extends ParamsContext
>(service: Service<T, U, V>, options: Ollie.Options = {}) {
  const { config } = service;
  let routes, events, graphql;

  if (config.routes) {
    routes = injectEnhancedLoggerToRoutes(config.routes, options);
    routes = instrumentRoutes(routes);
  }

  if (config.events) {
    events = injectEnhancedLoggerToEvents(config.events, options);
    events = instrumentEvents(events, options.logger);
  }

  if (config.graphql?.resolvers) {
    graphql = injectEnhancedLoggerToGraphql(config.graphql.resolvers, options);
  }

  return new Service({
    ...config,
    routes: routes ?? config.routes ?? {},
    events: events ?? config.events ?? {},
    graphql: graphql ?? config.graphql ?? {},
  });
}

