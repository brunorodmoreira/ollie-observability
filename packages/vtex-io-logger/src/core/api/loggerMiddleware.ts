import { ILogger } from "../../types/logger";
import { enhancedLoggerInjectionMiddlewareFactory } from "../injection/enhancedLoggerInjectionMiddlewareFactory";

export function loggerMiddleware({ logger }: { logger: ILogger }) {
  return enhancedLoggerInjectionMiddlewareFactory({
    logger,
  });
}
