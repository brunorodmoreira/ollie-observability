import pino from "pino";
// @ts-expect-error
import pinoOpenSearch from "pino-opensearch";

const streamToOpenSearch = pinoOpenSearch({
  // Your OpenSearch configurations
});

const logger = pino({ level: "error" }, streamToOpenSearch);

export default logger;
