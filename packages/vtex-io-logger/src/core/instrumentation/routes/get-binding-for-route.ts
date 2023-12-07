import type { ServiceContext } from "@vtex/api";

export function getBindingsForRoute(ctx: ServiceContext) {
  const { url, method, ip: remoteAddress } = ctx.request;

  const { requestId, operationId, production, account, workspace, tracer } =
    ctx.vtex;

  return {
    req: {
      url,
      method,
      remoteAddress,
    },
    vtex: {
      requestId,
      operationId,
      production,
      account,
      workspace,
      traceId: tracer.traceId,
      appId: process.env.VTEX_APP_ID ?? '',
      type: "route",
    },
  };
}
