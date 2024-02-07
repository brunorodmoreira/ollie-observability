import type { ServiceConfig } from "@vtex/api";
import type { Ollie } from "../../types/ollie";
import { enhancedLoggerInjectionGraphqlFactory } from "./enhanced-logger-injection-graphql-factory";

export function injectEnhancedLoggerToGraphql(
    graphql: ServiceConfig<any, any, any>["graphql"],
    options: Ollie.Options
) {
    const enhancedQueries: typeof graphql.Query = {};
    const enhancedMutations: typeof graphql.Mutation = {};

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-argument -- graphql is not null
    for (const [name, handler] of Object.entries(graphql!.Query!)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        enhancedQueries[name] = enhancedLoggerInjectionGraphqlFactory(handler, options)
    }


    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-argument -- graphql is not null
    for (const [name, handler] of Object.entries(graphql!.Mutation!)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        enhancedMutations[name] = enhancedLoggerInjectionGraphqlFactory(handler, options)
    }



    return { Query: enhancedQueries, ...graphql };
}