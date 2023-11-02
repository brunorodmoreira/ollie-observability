import { ServiceContext } from "@vtex/api";
import { fullLoggingMiddlewareFactory } from "../../../src/core/instrumentation/fullLoggingMiddlewareFactory";
import { ParamsContextWithEnhancedLogger } from "../../../src/types/service";

describe("fullLoggingMiddlewareFactory", () => {
  let ctx: ServiceContext<any, any, ParamsContextWithEnhancedLogger>;
  let next: jest.Mock;
  let enhancedLogger: { info: jest.Mock; error: jest.Mock };

  beforeEach(() => {
    next = jest.fn();
    enhancedLogger = { info: jest.fn(), error: jest.fn() };
    ctx = {
      enhancedLogger,
      request: {
        url: "testUrl",
        method: "GET",
        headers: { "user-agent": "testAgent" },
      },
      vtex: {
        requestId: "testRequestId",
        operationId: "testOperationId",
        production: true,
        account: "testAccount",
        workspace: "testWorkspace",
        tracer: { traceId: "testTraceId" },
      },
    } as any;
  });

  it("should log info when request finishes successfully", async () => {
    const middleware = fullLoggingMiddlewareFactory();
    await middleware(ctx, next);

    expect(enhancedLogger.info).toHaveBeenCalled();
    expect(enhancedLogger.error).not.toHaveBeenCalled();
  });

  it("should log error when request finishes with error", async () => {
    const middleware = fullLoggingMiddlewareFactory();
    next.mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    try {
      await middleware(ctx, next);
    } catch (err) {}

    expect(enhancedLogger.error).toHaveBeenCalled();
    expect(enhancedLogger.info).not.toHaveBeenCalled();
  });

  it("should rethrow the error", async () => {
    const middleware = fullLoggingMiddlewareFactory();
    const error = new Error("Test error");
    next.mockImplementationOnce(() => {
      throw error;
    });

    await expect(middleware(ctx, next)).rejects.toThrow(error);
  });
});
