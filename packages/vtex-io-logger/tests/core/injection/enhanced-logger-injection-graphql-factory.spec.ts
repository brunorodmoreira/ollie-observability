/* eslint-disable @typescript-eslint/no-unsafe-assignment -- necessary for mocks */
import type { ServiceContext } from "@vtex/api";
import { enhancedLoggerInjectionGraphqlFactory } from "../../../src/core/injection/enhanced-logger-injection-graphql-factory";
import type { Ollie, ParamsContextWithOllie } from "../../../src/types/ollie";

describe("enhancedLoggerInjectionGraphqlFactory", () => {
  let logger: Ollie.Logger;
  let ctx: ServiceContext<any, any, ParamsContextWithOllie>;
  let resolver: (_: unknown,
    args: unknown,
    ctx: ServiceContext<any, any, ParamsContextWithOllie>) => unknown

  beforeEach(() => {
    logger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    };

    ctx = {
      vtex: {
        logger: {
          log: jest.fn(),
        },
      },
    } as any;

    resolver = jest.fn().mockResolvedValue(undefined);
  });

  it("should inject the logger into the context", async () => {
    const graphql = enhancedLoggerInjectionGraphqlFactory(resolver, { logger });
    await graphql({}, {}, ctx);
    expect(ctx.ollie.logger).toBe(logger);
  });

  it("should use ctx.vtex.logger if logger is not provided", async () => {
    const vtexLogger: Ollie.Logger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    };

    ctx.vtex = { logger: vtexLogger } as any;

    const graphql = enhancedLoggerInjectionGraphqlFactory(resolver, {});
    await graphql({}, {}, ctx);
    expect(ctx.ollie.logger).toBe(vtexLogger);
  });

});