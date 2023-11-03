import type { ParamsContext } from "@vtex/api";
import type { Logger } from "./logger";

export interface ParamsContextWithOllie extends ParamsContext {
  ollie: {
    logger: Logger;
  };
}
