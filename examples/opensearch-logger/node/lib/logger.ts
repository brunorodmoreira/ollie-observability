import pino from "pino";
// @ts-ignore
import pinoOpenSearch from "pino-opensearch";

const streamToOpenSearch = pinoOpenSearch({
  index: "sunstone",
  node: "https://search-sunstone-dev-pfod3lwksc4ch7iizua7iqdj5y.us-east-1.es.amazonaws.com",
  "es-version": 7,
  "flush-bytes": 1000,
  "flush-interval": 5000,
  auth: {
    username: process.env.OPEN_SEARCH_USERNAME,
    password: process.env.OPEN_SEARCH_PASSWORD,
  },
});

streamToOpenSearch.on("error", (err: any) => {
  console.error("Error on pino-elasticsearch", err);
});

streamToOpenSearch.on("insertError", (err: any) => {
  console.error("Error inserting document", err);
});

streamToOpenSearch.on("insert", (doc: any) => {
  console.log("Inserted document", doc);
});

streamToOpenSearch.on("unknown", (line: any, error: any) => {
  console.error("Unknown line", line, error);
});

const logger = pino({ level: "info" }, streamToOpenSearch);

export default logger;
