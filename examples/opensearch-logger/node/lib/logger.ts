import pino from "pino";
// @ts-ignore
import pinoOpenSearch from "pino-opensearch";

const streamToOpenSearch = pinoOpenSearch({
  // Your OpenSearch configurations
});

const logger = pino({ level: "error" }, streamToOpenSearch);

export default logger;
