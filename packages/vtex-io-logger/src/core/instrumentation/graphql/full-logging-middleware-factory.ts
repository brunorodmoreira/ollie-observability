import type { ServiceContext } from "@vtex/api";
import type { Ollie, ParamsContextWithOllie } from "../../../types/ollie";
import { getBindingsForGraphql } from "../get-binding";

function getResponseTime(startTime: bigint) {
  return Math.floor(Number(process.hrtime.bigint() - startTime) / 1e6);
}

export function fullLoggingResolverFactory(resolver: (_: unknown,
  args: unknown,
  ctx: ServiceContext<any, any, ParamsContextWithOllie>) => unknown, type: string, resolverName: string, logger?: Ollie.Logger) {

  const newResolver = async function fullLoggingResolver(
    _: unknown,
    args: unknown,
    ctx: ServiceContext<any, any, ParamsContextWithOllie>
  ) {
    const bindings = getBindingsForGraphql(type, resolverName, resolver.name, ctx);

    const startTime = process.hrtime.bigint();
    let result;
    try {

      result = await resolver(_, args, ctx);
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
    return result
  };

  return newResolver;


};
