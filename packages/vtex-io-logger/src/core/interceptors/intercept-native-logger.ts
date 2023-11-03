import type { Ollie } from "../../types/ollie";
import { getFunctionCaller } from "../../utils/tracings";

export const NATIVE_VTEX_LOGGER_TRACE =
  "at Logger.log (/usr/local/app/node_modules/@vtex/api";

function isNativeVtexLoggerTrace(caller: string | undefined) {
  if (!caller) {
    return false;
  }

  return caller.startsWith(NATIVE_VTEX_LOGGER_TRACE);
}
// TODO: Currently VTEX Logger uses `console.log` to log messages. If this changes, we need to update this interceptor.
export function interceptNativeLogger({ logger }: { logger: Ollie.Logger }) {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- necessary to intercept native logger
  const nativeLog = global.console.log;

  global.console.log = (...args: any[]) => {
    const caller = getFunctionCaller();

    const isVtex = isNativeVtexLoggerTrace(caller);

    if (!isVtex) {
      nativeLog.apply(global.console, args);

      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- it's safe
    logger.log(...args);

    nativeLog.apply(global.console, args);
  };
}
