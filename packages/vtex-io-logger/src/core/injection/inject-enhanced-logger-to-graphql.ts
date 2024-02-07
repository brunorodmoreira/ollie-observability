import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionGraphqlFactory } from "./enhanced-logger-injection-graphql-factory";

export function injectEnhancedLoggerToGraphql(
    graphql: any,
    options: Ollie.Options
) {
    const enhancedQueries: typeof graphql.resolvers.Query = {};
    const enhancedMutations: typeof graphql.resolvers.Mutation = {};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    for (const [name, handler] of Object.entries(graphql.resolvers.Query)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        enhancedQueries[name] = enhancedLoggerInjectionGraphqlFactory(handler, options)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    for (const [name, handler] of Object.entries(graphql.resolvers.Mutation)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        enhancedMutations[name] = enhancedLoggerInjectionGraphqlFactory(handler, options)
    }

    const newGraphql = { resolvers: { Query: enhancedQueries, Mutation: enhancedMutations }, ...graphql }

    return newGraphql;
}