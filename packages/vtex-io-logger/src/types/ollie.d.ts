import type { ParamsContext } from "@vtex/api";

type LogFn = (message: any) => void;

declare namespace Ollie {
  export interface Logger {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
  }

  interface ParamsContextWithOllie extends ParamsContext {
    ollie: {
      logger: Logger;
    };
  }
}
