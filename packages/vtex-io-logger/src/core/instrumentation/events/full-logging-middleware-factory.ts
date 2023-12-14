import type { EventContextWithOllie, Ollie } from "../../../types/ollie";
import { getBindingsForEvents } from "../get-binding";

function getResponseTime(startTime: bigint) {
  return Math.floor(Number(process.hrtime.bigint() - startTime) / 1e6);
}

export function fullLoggingMiddlewareFactory(logger?: Ollie.Logger) {
  return async function fullLoggingMiddleware(
    ctx: EventContextWithOllie<any>,
    next: () => Promise<any>
  ) {

    const bindings = getBindingsForEvents(ctx);

    const startTime = process.hrtime.bigint();

    try {
      await next();
    } catch (err) {
      logger?.error({
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

    logger?.info(params);
  };
}