/* eslint-disable @typescript-eslint/no-unsafe-assignment -- necessary for mocks */
import type { ServiceContext } from "@vtex/api";
import { enhancedLoggerInjectionMiddlewareFactory } from "../../../src/core/injection/enhanced-logger-injection-middleware-factory";
import type { Ollie, ParamsContextWithOllie } from "../../../src/types/ollie";

describe("enhancedLoggerInjectionMiddlewareFactory", () => {
  let logger: Ollie.Logger;
  let ctx: ServiceContext<any, any, ParamsContextWithOllie>;
  let next: jest.Mock;

  beforeEach(() => {
    logger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    };

    ctx = {} as any;
    next = jest.fn().mockResolvedValue(undefined);
  });

  it("should inject the logger into the context", async () => {
    const middleware = enhancedLoggerInjectionMiddlewareFactory({ logger });
    await middleware(ctx, next);
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

    const middleware = enhancedLoggerInjectionMiddlewareFactory({});
    await middleware(ctx, next);
    expect(ctx.ollie.logger).toBe(vtexLogger);
  });

  it("should call the next function", async () => {
    const middleware = enhancedLoggerInjectionMiddlewareFactory({ logger });
    await middleware(ctx, next);
    expect(next).toHaveBeenCalled();
  });
});
