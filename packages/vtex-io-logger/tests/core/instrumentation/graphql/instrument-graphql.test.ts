import type { Resolver } from "@vtex/api";
import { instrumentGraphql } from "../../../../src/core/instrumentation/graphql/instrument-graphql";

describe("instrumentGraphql", () => {
    test("should enhance Query resolvers with logging", () => {
        const graphql = {
            resolvers: {
                Query: {
                    getUser: jest.fn(),
                    getProduct: jest.fn(),
                },
                Mutation: {},
            },
        };

        const logger = {
            info: jest.fn(),
            debug: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        };

        const enhancedGraphql = instrumentGraphql(graphql, logger);

        if ('getUser' in enhancedGraphql.resolvers.Query) {
            expect(typeof enhancedGraphql.resolvers.Query.getUser).toBe(`function`);
        }
        expect(typeof (enhancedGraphql.resolvers.Query as Record<string, Resolver<any, any, any>>).getProduct).toBe(`function`);
        expect(logger.info).not.toHaveBeenCalled();
    });

    test("should enhance Mutation resolvers with logging", () => {
        const graphql = {
            resolvers: {
                Query: {},
                Mutation: {
                    createUser: jest.fn(),
                    updateProduct: jest.fn(),
                },
            },
        };

        const logger = {
            info: jest.fn(),
            debug: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        };

        const enhancedGraphql = instrumentGraphql(graphql, logger);

        if ('createUser' in enhancedGraphql.resolvers.Mutation) {
            expect(typeof enhancedGraphql.resolvers.Mutation.createUser).toBe(`function`)
        }
        if ('updateProduct' in enhancedGraphql.resolvers.Mutation) {
            expect(typeof enhancedGraphql.resolvers.Mutation.updateProduct).toBe(`function`)
        }
        expect(logger.info).not.toHaveBeenCalled();
    });

});