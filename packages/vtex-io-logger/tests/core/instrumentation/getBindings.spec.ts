import { getBindings } from "../../../src/core/instrumentation/getBinding";

describe("getBindings", () => {
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
  };

  const mockContext: any = {
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
    const result = getBindings(mockContext);

    expect(result).toEqual(expected);
  });

  it("should return correct object when tracer is undefined", () => {
    const ctx = {
      ...mockContext,
      vtex: {
        ...mockContext.vtex,
        tracer: undefined,
      },
    };

    const result = getBindings(ctx);

    expect(result).toEqual({
      ...expected,
      traceId: undefined,
    });
  });
});
