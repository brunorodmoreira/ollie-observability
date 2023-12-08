import type { EventContext, IOClients, ParamsContext, ServiceContext } from "@vtex/api";

type LogFn = (...args: any[]) => void;

export interface ParamsContextWithOllie extends ParamsContext {
  ollie: {
    logger: Ollie.Logger;
  };
}

export interface ClientsWithOllie extends IOClients {
  ollie: {
    logger: Ollie.Logger;
  };
}

export type ContextWithOllie<
  ClientsT extends IOClients = IOClients,
  StateT extends RecorderState = RecorderState
> = ServiceContext<ClientsT, StateT, ParamsContextWithOllie>;

export type EventContextWithOllie<
  ClientsT extends IOClients = IOClients,
  StateT extends RecorderState = RecorderState
> = EventContext<ClientsT, StateT> & {
  vtex: ClientsWithOllie;
};

export declare namespace Ollie {
  interface Logger {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
  }

  interface Options {
    logger?: Logger;
    interceptVtexLogger?: boolean;
  }
}
