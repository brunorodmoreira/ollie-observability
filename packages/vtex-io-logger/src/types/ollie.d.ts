import type { ParamsContext, ServiceContext } from "@vtex/api";

type LogFn = (...args: any[]) => void;

export interface ParamsContextWithOllie extends ParamsContext {
  ollie: {
    logger: Ollie.Logger;
  };
}

interface OptionsWithLogger {
  logger: Ollie.Logger;
  interceptNativeLogger?: boolean;
}

interface OptionsWithoutLogger {
  logger?: undefined;
}

export type ContextWithOllie<
  ClientsT extends IOClients = IOClients,
  StateT extends RecorderState = RecorderState
> = ServiceContext<ClientsT, StateT, ParamsContextWithOllie>;

export declare namespace Ollie {
  interface Logger {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
    log: LogFn;
  }

  type Options = OptionsWithLogger | OptionsWithoutLogger;
}
