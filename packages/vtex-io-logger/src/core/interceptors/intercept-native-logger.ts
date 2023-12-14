import type { IOContext, LogLevel } from "@vtex/api";
import { ollieConsole } from "../../services/ollie-console";
import type { Ollie } from "../../types/ollie";

function formatData(data: unknown, level: string, ctx: IOContext) {
  return {
    data,
    level,
    account: ctx.vtex.account,
    workspace: ctx.vtex.workspace,
    requestId: ctx.vtex.requestId,
    operationId: ctx.vtex.operationId,
    production: ctx.vtex.production,
    appId: process.event.VTEX_APP_ID ?? '',
    appVersion: process.event.VTEX_APP_VERSION ?? '',
    appName: process.event.VTEX_APP_NAME ?? '',
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
