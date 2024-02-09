



import type { GraphQLOptions, ServiceContext } from "@vtex/api";
import type { Ollie, ParamsContextWithOllie } from "../../types/ollie";
import { enhancedLoggerInjectionGraphqlFactory } from "./enhanced-logger-injection-graphql-factory";

export function injectEnhancedLoggerToGraphql(
    graphql: GraphQLOptions<any, any, any>,
    options: Ollie.Options
) {

    let newGraphql = graphql;
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- necessary */
    if (graphql.resolvers.Query) {
        const enhancedQueries: Record<string, any> = {};
        for (const [name, handler] of Object.entries(graphql.resolvers.Query)) {
            enhancedQueries[name] = enhancedLoggerInjectionGraphqlFactory(handler as (_: unknown, args: unknown, ctx: ServiceContext<any, any, ParamsContextWithOllie>) => unknown, options)
        }

        newGraphql = { ...graphql, resolvers: { ...graphql.resolvers, Query: enhancedQueries } }
    }
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- necessary */
    if (graphql.resolvers.Mutation) {
        const enhancedMutations: Record<string, any> = {};

        for (const [name, handler] of Object.entries(graphql.resolvers.Mutation)) {

            enhancedMutations[name] = enhancedLoggerInjectionGraphqlFactory(handler as (_: unknown, args: unknown, ctx: ServiceContext<any, any, ParamsContextWithOllie>) => unknown, options)
        }
        newGraphql = { ...graphql, resolvers: { ...graphql.resolvers, Mutation: enhancedMutations } }
    }

    return newGraphql
}