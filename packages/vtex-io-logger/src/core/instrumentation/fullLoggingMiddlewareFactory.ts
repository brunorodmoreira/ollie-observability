import { ServiceContext } from "@vtex/api";
import { ParamsContextWithEnhancedLogger } from "../../types/service";
import { getBindings } from "./getBinding";

export function fullLoggingMiddlewareFactory() {
  return async function fullLoggingMiddleware(
    ctx: ServiceContext<any, any, ParamsContextWithEnhancedLogger>,
    next: () => Promise<any>
  ) {
    const { enhancedLogger } = ctx;

    const bindings = getBindings(ctx);

    const startTime = process.hrtime.bigint();

    try {
      await next();
    } catch (err) {
      const message = "Request finished with error";

      if (err instanceof Error) {
        enhancedLogger.error({
          ...bindings,
          message,
          error: err.message,
          stack: err.stack,
        });
      } else {
        enhancedLogger.error({
          ...bindings,
          message,
          error: "Unknown error",
        });
      }

      throw err;
    }

    const endTime = process.hrtime.bigint();

    const duration = Number(endTime - startTime) / 1e6;

    enhancedLogger.info({
      ...bindings,
      duration,
      message: "Request finished successfully",
    });
  };
}
