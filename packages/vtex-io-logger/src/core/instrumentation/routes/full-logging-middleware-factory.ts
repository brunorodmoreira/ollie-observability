import type { ServiceContext } from "@vtex/api";
import type { ParamsContextWithOllie } from "../../../types/ollie";
import { getBindingsForRoute } from "./get-binding-for-route";

export function fullLoggingMiddlewareFactory() {
  return async function fullLoggingMiddleware(
    ctx: ServiceContext<any, any, ParamsContextWithOllie>,
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
      logger.error({
        ...bindings,
        error:
          err instanceof Error
            ? {
                type: err.name,
                message: err.message,
                stack: err.stack,
              }
            : {
                type: "UnknownError",
                message: "Unknown error",
                stack: JSON.stringify(err),
              },
      });

      throw err;
    }

    const endTime = process.hrtime.bigint();

    const responseTime = Number(endTime - startTime) / 1e6;

    logger.info({
      ...bindings,
      res: {
        statusCode: ctx.status,
        headers: ctx.response.headers,
      },
      responseTime,
    });
  };
}
