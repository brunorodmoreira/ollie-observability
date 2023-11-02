import type { ParamsContext } from "@vtex/api";
import type { ILogger } from "./logger";

export interface ParamsContextWithEnhancedLogger extends ParamsContext {
  enhancedLogger: ILogger;
}
