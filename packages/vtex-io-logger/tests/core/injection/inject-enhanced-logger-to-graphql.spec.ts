import type { GraphQLOptions, Resolver } from "@vtex/api";
import { injectEnhancedLoggerToGraphql } from "../../../src/core/injection/inject-enhanced-logger-to-graphql";
import type { Ollie } from "../../../src/types/ollie";

jest.mock(
  "../../../src/core/injection/enhanced-logger-injection-middleware-factory"
);

describe("injectEnhancedLoggerToGraphql", () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
  } as Ollie.Logger;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a new function", () => {
    const mockResolver = jest.fn();

    const graphql: GraphQLOptions<any, any, any> = {
      resolvers: {
        Query: { Some: mockResolver } as unknown as Record<string, Resolver<any, any, any>>,
        Mutation: { Some: mockResolver } as unknown as Record<string, Resolver<any, any, any>>
      }
    };

    const result = injectEnhancedLoggerToGraphql(graphql, { logger: mockLogger });

    const testGraphqlQueryHandler = result.resolvers.Query as Record<string, Resolver<any, any, any>>;

    expect(typeof testGraphqlQueryHandler.Some).toBe('function');

    const testGraphqlMutationHandler = result.resolvers.Mutation as Record<string, Resolver<any, any, any>>;

    expect(typeof testGraphqlMutationHandler.Some).toBe('function');
  });
});
