import { ServiceContext } from "@vtex/api";

export function getBindingsForRoute(ctx: ServiceContext) {
  const {
    url,
    method,
    headers: { "user-agent": userAgent },
  } = ctx.request;

  const { requestId, operationId, production, account, workspace, tracer } =
    ctx.vtex;

  return {
    url,
    method,
    userAgent,
    requestId,
    operationId,
    production,
    account,
    workspace,
    traceId: tracer?.traceId,
  };
}
