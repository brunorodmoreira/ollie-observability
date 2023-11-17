import type { ServiceConfig } from "@vtex/api";
import { instrumentRoutes } from "../../../../src/core/instrumentation/routes/instrument-routes";

describe("instrumentRoutes", () => {
  it("should return routes if routes is not provided", () => {
    const result = instrumentRoutes(undefined);

    expect(result).toBe(undefined);
  });

  it("should throw an error if a route's handlers is not an array", () => {
    const routes: ServiceConfig["routes"] = {
      // @ts-expect-error -- intentionally passing a non-array value
      test: "not an array",
    };

    expect(() => instrumentRoutes(routes)).toThrow();
  });

  it("should throw an error if a route does not have the logger injected", () => {
    const routes: ServiceConfig["routes"] = {
      test: [],
    };

    expect(() => instrumentRoutes(routes)).toThrow();
  });

  it("should add fullLoggingMiddleware to the correct position in the handlers array", () => {
    function injectionLoggerMiddleware() {
      /* empty */
    }

    injectionLoggerMiddleware.__loggerInjectionMiddleware = true;

    const routes: ServiceConfig["routes"] = {
      test: [injectionLoggerMiddleware],
    };

    const result = instrumentRoutes(routes);

    // eslint-disable-next-line @typescript-eslint/ban-types -- necessary for testing
    const handlers = result?.test as Function[];

    expect(handlers[1].name).toEqual("fullLoggingMiddleware");
  });
});
