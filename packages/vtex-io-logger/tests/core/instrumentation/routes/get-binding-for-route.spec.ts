/* eslint-disable @typescript-eslint/no-unsafe-argument -- mock */
import { getBindingsForRoute } from "../../../../src/core/instrumentation/routes/get-binding-for-route";

describe("getBindingsForRoute", () => {
  const mockContext = {
    request: {
      url: "testUrl",
      method: "GET",
      headers: { "user-agent": "testAgent" },
      ip: "::1",
    },
    vtex: {
      requestId: "testRequestId",
      operationId: "testOperationId",
      production: true,
      account: "testAccount",
      workspace: "testWorkspace",
      tracer: { traceId: "testTraceId" },
      type: "route",
    },
    process: {
      env: {
        appId: process.env.VTEX_APP_ID ?? '',
      }
    }
  };

  const expected = {
    req: {
      url: "testUrl",
      method: "GET",
      remoteAddress: "::1",
    },
    vtex: {
      requestId: "testRequestId",
      operationId: "testOperationId",
      production: true,
      account: "testAccount",
      workspace: "testWorkspace",
      traceId: "testTraceId",
      type: "route",
      appId: process.env.VTEX_APP_ID ?? '',
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
      vtex: {
        ...expected.vtex,
        traceId: undefined,
      },
    });
  });
});
