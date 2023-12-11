import type { EventContext, ServiceContext } from "@vtex/api";

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
      type: "route",
    },
  };
}

export function getBindingsForEvents(ctx: EventContext<any>) {
  const eventInfo = ctx.vtex.eventInfo;

  const { requestId, operationId, production, account, workspace, tracer } =
    ctx.vtex;

  return {
    eventInfo,
    vtex: {
      requestId,
      operationId,
      production,
      account,
      workspace,
      traceId: tracer.traceId,
      type: "event",
    },
  };
}
