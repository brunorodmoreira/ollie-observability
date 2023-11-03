import type { ParamsContext } from "@vtex/api";
import type { Logger } from "./logger";

export interface ParamsContextWithSunstone extends ParamsContext {
  sunstone: {
    logger: Logger;
  };
}
