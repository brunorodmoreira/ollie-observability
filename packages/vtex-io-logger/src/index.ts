import type {
  IOClients,
  ParamsContext,
  RecorderState,
  Service,
} from "@vtex/api";

export function withLogger<
  T extends IOClients,
  U extends RecorderState,
  V extends ParamsContext
>(service: Service<T, U, V>) {}
