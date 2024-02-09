import type { GraphQLOptions, ServiceContext } from "@vtex/api";
import type { Ollie, ParamsContextWithOllie } from "../../../types/ollie";
import { fullLoggingResolverFactory } from "./full-logging-middleware-factory";

export function instrumentGraphql(graphql: GraphQLOptions<any, any, any>, logger?: Ollie.Logger) {

  let newGraphql = graphql;

  try {
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- necessary */
    if (graphql.resolvers.Query) {
      const enhancedQueries: Record<string, any> = {};
      for (const [name, handler] of Object.entries(graphql.resolvers.Query)) {
        enhancedQueries[name] = fullLoggingResolverFactory(handler as (_: unknown, args: unknown, ctx: ServiceContext<any, any, ParamsContextWithOllie>) => unknown, 'Query', name, logger)
      }

      newGraphql = { ...graphql, resolvers: { ...graphql.resolvers, Query: enhancedQueries } }
    }

    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- necessary */
    if (graphql.resolvers.Mutation) {
      const enhancedMutations: Record<string, any> = {};

      for (const [name, handler] of Object.entries(graphql.resolvers.Mutation)) {

        enhancedMutations[name] = fullLoggingResolverFactory(handler as (_: unknown, args: unknown, ctx: ServiceContext<any, any, ParamsContextWithOllie>) => unknown, 'Mutation', name, logger)
      }
      newGraphql = { ...graphql, resolvers: { ...graphql.resolvers, Mutation: enhancedMutations } }
    }
  } catch (error) {
    logger?.info({ message: error })
  }

  return newGraphql
}
