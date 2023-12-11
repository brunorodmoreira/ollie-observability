/* eslint-disable @typescript-eslint/no-unsafe-assignment -- necessary for mocks */
import type { ServiceContext } from "@vtex/api";
import { fullLoggingRouteMiddlewareFactory } from "../../../../src/core/instrumentation/routes/full-logging-middleware-factory";
import type { ParamsContextWithOllie } from "../../../../src/types/ollie";

describe("fullLoggingRouteMiddlewareFactory", () => {
  let ctx: ServiceContext<any, any, ParamsContextWithOllie>;
  let next: jest.Mock;
  let logger: { info: jest.Mock; error: jest.Mock };

  beforeEach(() => {
    next = jest.fn();
    logger = { info: jest.fn(), error: jest.fn() };
    ctx = {
      ollie: { logger },
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
      response: {
        headers: { "cache-control": "testCacheControl" },
      },
      status: 200,
    } as any;
  });

  it("should log info when request finishes successfully", async () => {
    const middleware = fullLoggingRouteMiddlewareFactory();
    await middleware(ctx, next);

    expect(logger.info).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  it("should log error when request finishes with error", async () => {
    const middleware = fullLoggingRouteMiddlewareFactory();
    next.mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    try {
      await middleware(ctx, next);
    } catch (err) {
      /* empty */
    }

    expect(logger.error).toHaveBeenCalled();
    expect(logger.info).not.toHaveBeenCalled();
  });

  it("should rethrow the error", async () => {
    const middleware = fullLoggingRouteMiddlewareFactory();
    const error = new Error("Test error");
    next.mockImplementationOnce(() => {
      throw error;
    });

    await expect(middleware(ctx, next)).rejects.toThrow(error);
  });
});
