import type { IOContext, LogLevel } from "@vtex/api";
import { ollieConsole } from "../../services/ollie-console";
import type { Ollie } from "../../types/ollie";

function formatData(data: unknown, level: string, ctx: IOContext) {
  return {
    data,
    level,
    account: ctx.account,
    workspace: ctx.workspace,
    requestId: ctx.requestId,
    operationId: ctx.operationId,
    production: ctx.production,
    appId: process.env.VTEX_APP_ID,
    __VTEX_IO_LOG: true,
  };
}

export function interceptNativeLogger(
  ctx: IOContext,
  { logger }: { logger: Ollie.Logger }
) {
  const nativeLog = ctx.logger.log;

  ctx.logger.log = (message: any, logLevel: LogLevel) => {
    const data = formatData(message, logLevel, ctx);

    logger[logLevel](data);
    nativeLog.apply(ctx.logger, [message, logLevel]);
  };

  ollieConsole.warn(
    'Intercepting native logger. Use "interceptVtexLogger" option to disable this behavior.'
  );
}
