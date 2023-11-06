import type { ServiceContext } from "@vtex/api";

export function getBindingsForRoute(ctx: ServiceContext) {
  const { url, method, headers, ip: remoteAddress } = ctx.request;

  const { requestId, operationId, production, account, workspace, tracer } =
    ctx.vtex;

  return {
    req: {
      url,
      method,
      headers,
      remoteAddress,
    },
    vtex: {
      requestId,
      operationId,
      production,
      account,
      workspace,
      traceId: tracer.traceId,
      type: "route",
    },
  };
}
