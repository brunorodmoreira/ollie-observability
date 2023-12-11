import type { ServiceContext } from "@vtex/api";
import type { EventContextWithOllie, ParamsContextWithOllie } from "../../../types/ollie";
import { getBindingsForEvents, getBindingsForRoute } from "./get-binding";

function getResponseTime(startTime: bigint) {
  return Math.floor(Number(process.hrtime.bigint() - startTime) / 1e6);
}

export function fullLoggingRouteMiddlewareFactory() {
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


export function fullLoggingEventMiddlewareFactory() {
  return async function fullLoggingMiddleware(
    ctx: EventContextWithOllie<any>,
    next: () => Promise<any>
  ) {
    const {
      ollie: { logger },
    } = ctx.vtex;

    const bindings = getBindingsForEvents(ctx);

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

        responseTime: getResponseTime(startTime),
      });

      throw err;
    }

    const params = {
      ...bindings,

      responseTime: getResponseTime(startTime),
    };

    logger.info(params);
  };
}