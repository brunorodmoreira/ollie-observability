import type { ServiceContext } from "@vtex/api";
import { enhancedLoggerInjectionMiddlewareFactory } from "../../../src/core/injection/enhancedLoggerInjectionMiddlewareFactory";
import { ILogger } from "../../../src/types/logger";
import { ParamsContextWithSunstone } from "../../../src/types/service";

describe("enhancedLoggerInjectionMiddlewareFactory", () => {
  let logger: ILogger;
  let ctx: ServiceContext<any, any, ParamsContextWithSunstone>;
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
    expect(ctx.sunstone.logger).toBe(logger);
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
    expect(ctx.sunstone.logger).toBe(vtexLogger);
  });

  it("should call the next function", async () => {
    const middleware = enhancedLoggerInjectionMiddlewareFactory({ logger });
    await middleware(ctx, next);
    expect(next).toHaveBeenCalled();
  });
});
