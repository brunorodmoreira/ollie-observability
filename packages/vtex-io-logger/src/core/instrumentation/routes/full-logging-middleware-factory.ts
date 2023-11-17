import type { ServiceContext } from "@vtex/api";
import type { ParamsContextWithOllie } from "../../../types/ollie";
import { getBindingsForRoute } from "./get-binding-for-route";

function getResponseTime(startTime: bigint) {
  return Math.floor(Number(process.hrtime.bigint() - startTime) / 1e6);
}

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
                stack: JSON.stringify(err),
              },
        res: {
          statusCode: ctx.status,
        },
        responseTime: getResponseTime(startTime),
      });

      throw err;
    }

    const params = {
      ...bindings,
      res: {
        statusCode: ctx.status,
      },
      responseTime: getResponseTime(startTime),
    };

    if (ctx.status >= 400) {
      logger.error(params);

      return;
    }

    logger.info(params);
  };
}
