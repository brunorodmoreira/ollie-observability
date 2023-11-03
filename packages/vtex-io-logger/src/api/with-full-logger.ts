import type { IOClients, ParamsContext, RecorderState } from "@vtex/api";
import { Logger, Service } from "@vtex/api";
import { injectEnhancedLoggerToRoutes } from "../core/injection/inject-enhanced-logger-to-routes";
import { instrumentRoutes } from "../core/instrumentation/routes/instrument-routes";
import { interceptNativeLogger } from "../core/interceptors/intercept-native-logger";
import { ollieConsole } from "../services/ollie-console";
import type { Ollie } from "../types/ollie";

export function withFullLogger<
  T extends IOClients,
  U extends RecorderState,
  V extends ParamsContext
>(service: Service<T, U, V>, options: Ollie.Options = {}) {
  const { config } = service;
  const { logger, interceptVtexLogger } = options;

  if (logger && !(logger instanceof Logger) && interceptVtexLogger) {
    interceptNativeLogger({ logger });

    ollieConsole.warn(
      'Intercepting native logger. Use "interceptVtexLogger" option to disable this behavior'
    );
  }

  let routes = injectEnhancedLoggerToRoutes(config.routes, { logger });

  routes = instrumentRoutes(routes);

  return new Service({
    ...config,
    routes,
  });
}
