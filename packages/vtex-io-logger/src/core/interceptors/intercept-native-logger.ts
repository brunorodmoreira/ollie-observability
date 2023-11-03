import type { LogLevel, ServiceContext } from "@vtex/api";
import { ollieConsole } from "../../services/ollie-console";
import type { Ollie } from "../../types/ollie";

function formatData(data: unknown, level: string, ctx: ServiceContext) {
  return {
    data,
    level,
    account: ctx.vtex.account,
    workspace: ctx.vtex.workspace,
    requestId: ctx.vtex.requestId,
    operationId: ctx.vtex.operationId,
    production: ctx.vtex.production,
    __VTEX_IO_LOG: true,
  };
}

export function interceptNativeLogger(
  ctx: ServiceContext,
  { logger }: { logger: Ollie.Logger }
) {
  const nativeLog = ctx.vtex.logger.log;

  ctx.vtex.logger.log = (message: any, logLevel: LogLevel) => {
    const data = formatData(message, logLevel, ctx);

    logger[logLevel](data);

    nativeLog.apply(ctx.vtex.logger, [`vtex ${message}`, logLevel]);
  };

  ollieConsole.warn(
    'Intercepting native logger. Use "interceptVtexLogger" option to disable this behavior.'
  );
}
