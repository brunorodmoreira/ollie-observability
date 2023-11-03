/* eslint-disable @typescript-eslint/no-unsafe-argument -- mock */
import { getBindingsForRoute } from "../../../../src/core/instrumentation/routes/get-binding-for-route";

describe("getBindingsForRoute", () => {
  const expected = {
    url: "testUrl",
    method: "GET",
    userAgent: "testAgent",
    requestId: "testRequestId",
    operationId: "testOperationId",
    production: true,
    account: "testAccount",
    workspace: "testWorkspace",
    traceId: "testTraceId",
    type: "route",
  };

  const mockContext = {
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
  };
  it("should return correct object", () => {
    const result = getBindingsForRoute(mockContext as any);

    expect(result).toEqual(expected);
  });

  it("should return correct object when tracer is undefined", () => {
    const ctx = {
      ...mockContext,
      vtex: {
        ...mockContext.vtex,
        tracer: {},
      },
    };

    const result = getBindingsForRoute(ctx as any);

    expect(result).toEqual({
      ...expected,
      traceId: undefined,
    });
  });
});
