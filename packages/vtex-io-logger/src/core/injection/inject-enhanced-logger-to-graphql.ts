/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionGraphqlFactory } from "./enhanced-logger-injection-graphql-factory";

export function injectEnhancedLoggerToGraphql(
    graphql: any,
    options: Ollie.Options
) {
    const enhancedQueries: typeof graphql.resolvers.Query = {};
    const enhancedMutations: typeof graphql.resolvers.Mutation = {};

    for (const [name, handler] of Object.entries(graphql.resolvers.Query)) {
        enhancedQueries[name] = enhancedLoggerInjectionGraphqlFactory(handler, options)
    }

    for (const [name, handler] of Object.entries(graphql.resolvers.Mutation)) {
        enhancedMutations[name] = enhancedLoggerInjectionGraphqlFactory(handler, options)
    }

    return { ...graphql, resolvers: { ...graphql.resolvers, Query: enhancedQueries, Mutation: enhancedMutations } }
}