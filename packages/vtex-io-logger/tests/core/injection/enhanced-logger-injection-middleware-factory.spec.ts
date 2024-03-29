/* eslint-disable @typescript-eslint/no-unsafe-assignment -- necessary for mocks */
import type { EventContext, ServiceContext } from "@vtex/api";
import { enhancedLoggerInjectionEventsMiddlewareFactory, enhancedLoggerInjectionMiddlewareFactory } from "../../../src/core/injection/enhanced-logger-injection-middleware-factory";
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

    ctx = {
      vtex: {
        logger: {
          log: jest.fn(),
        },
      },
    } as any;
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

describe("enhancedLoggerInjectionEventsMiddlewareFactory", () => {
  let logger: Ollie.Logger;
  let ctx: EventContext<any>;
  let next: jest.Mock;

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
    next = jest.fn().mockResolvedValue(undefined);
  });

  it("should not intercept the VTEX logger if logger is not provided", async () => {
    const interceptVtexLogger = true;
    const middleware = enhancedLoggerInjectionEventsMiddlewareFactory({ interceptVtexLogger });
    await middleware(ctx, next);
    expect(ctx.vtex.logger).not.toBe(logger);
  });

  it("should not intercept the VTEX logger if interceptVtexLogger is false", async () => {
    const interceptVtexLogger = false;
    const middleware = enhancedLoggerInjectionEventsMiddlewareFactory({ logger, interceptVtexLogger });
    await middleware(ctx, next);
    expect(ctx.vtex.logger).not.toBe(logger);
  });

  it("should call the next function", async () => {
    const interceptVtexLogger = true;
    const middleware = enhancedLoggerInjectionEventsMiddlewareFactory({ logger, interceptVtexLogger });
    await middleware(ctx, next);
    expect(next).toHaveBeenCalled();
  });
});