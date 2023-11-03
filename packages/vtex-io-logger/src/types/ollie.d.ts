import type { ParamsContext, ServiceContext } from "@vtex/api";

type LogFn = (message: any) => void;

export declare namespace Ollie {
  interface Logger {
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

  interface Options {
    logger?: Logger;
  }

  type ContextWithOllie<
    ClientsT extends IOClients = IOClients,
    StateT extends RecorderState = RecorderState
  > = ServiceContext<ClientsT, StateT>;
}
