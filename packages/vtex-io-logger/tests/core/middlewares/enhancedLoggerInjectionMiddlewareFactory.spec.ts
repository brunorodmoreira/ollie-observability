import type { ServiceContext } from "@vtex/api";
import { enhancedLoggerInjectionMiddlewareFactory } from "../../../src/core/middlewares/enhancedLoggerInjectionMiddlewareFactory";
import { ILogger } from "../../../src/types/logger";
import { ParamsContextWithEnhancedLogger } from "../../../src/types/service";

describe("enhancedLoggerInjectionMiddlewareFactory", () => {
  let logger: ILogger;
  let ctx: ServiceContext<any, any, ParamsContextWithEnhancedLogger>;
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
    expect(ctx.enhancedLogger).toBe(logger);
  });

  it("should use ctx.vtex.logger if logger is not provided", async () => {
    const vtexLogger: ILogger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    };

    ctx.vtex = { logger: vtexLogger } as any;

    const middleware = enhancedLoggerInjectionMiddlewareFactory({});
    await middleware(ctx, next);
    expect(ctx.enhancedLogger).toBe(vtexLogger);
  });

  it("should call the next function", async () => {
    const middleware = enhancedLoggerInjectionMiddlewareFactory({ logger });
    await middleware(ctx, next);
    expect(next).toHaveBeenCalled();
  });
});
