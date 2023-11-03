import type { ServiceContext } from "@vtex/api";
import type { Ollie } from "../../../types/ollie";
import { getBindingsForRoute } from "./get-binding-for-route";

export function fullLoggingMiddlewareFactory() {
  return async function fullLoggingMiddleware(
    ctx: ServiceContext<any, any, Ollie.ParamsContextWithOllie>,
    next: () => Promise<any>
  ) {
    const {
      ollie: { logger },
    } = ctx;

    const bindings = getBindingsForRoute(ctx);

    const startTime = process.hrtime.bigint();

    try {
      await next();
    } catch (err) {
      const message = "Request finished with error";

      if (err instanceof Error) {
        logger.error({
          ...bindings,
          message,
          error: err.message,
          stack: err.stack,
        });
      } else {
        logger.error({
          ...bindings,
          message,
          error: "Unknown error",
        });
      }

      throw err;
    }

    const endTime = process.hrtime.bigint();

    const duration = Number(endTime - startTime) / 1e6;

    logger.info({
      ...bindings,
      duration,
      message: "Request finished successfully",
    });
  };
}
