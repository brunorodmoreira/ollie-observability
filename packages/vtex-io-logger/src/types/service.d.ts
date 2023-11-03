import type { ParamsContext } from "@vtex/api";
import type { ILogger } from "./logger";

export interface ParamsContextWithSunstone extends ParamsContext {
  sunstone: {
    logger: ILogger;
  };
}
