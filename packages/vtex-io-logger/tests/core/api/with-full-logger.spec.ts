import { Service } from "@vtex/api";
import { withFullLogger } from "../../../src/api/with-full-logger";
import { injectEnhancedLoggerToEvents } from "../../../src/core/injection/inject-enhanced-logger-to-events";
import { injectEnhancedLoggerToGraphql } from "../../../src/core/injection/inject-enhanced-logger-to-graphql";
import { injectEnhancedLoggerToRoutes } from "../../../src/core/injection/inject-enhanced-logger-to-routes";
import { instrumentEvents } from "../../../src/core/instrumentation/events/instrument-events";
import { instrumentGraphql } from "../../../src/core/instrumentation/graphql/instrument-graphql";
import { instrumentRoutes } from "../../../src/core/instrumentation/routes/instrument-routes";

jest.mock("@vtex/api");
jest.mock("../../../src/core/injection/inject-enhanced-logger-to-routes");
jest.mock("../../../src/core/instrumentation/routes/instrument-routes");
jest.mock("../../../src/core/injection/inject-enhanced-logger-to-events");
jest.mock("../../../src/core/instrumentation/events/instrument-events");

describe("withFullLogger", () => {
  beforeEach(() => {
    (injectEnhancedLoggerToRoutes as jest.Mock).mockClear();
    (instrumentRoutes as jest.Mock).mockClear();
    (injectEnhancedLoggerToEvents as jest.Mock).mockClear();
    (instrumentEvents as jest.Mock).mockClear();
    const mockInjectEnhancedLoggerToGraphql = jest.fn(injectEnhancedLoggerToGraphql);
    mockInjectEnhancedLoggerToGraphql.mockClear();
    const mockInstrumentGraphql = jest.fn(instrumentGraphql);
    mockInstrumentGraphql.mockClear();
  });

  it("calls dependencies with correct arguments and returns a new Service", () => {
    const mockRoutes = {};
    const mockEvents = {};
    const mockGraphql = {};

    const mockService: Service<any, any, any> = {
      config: {
        routes: mockRoutes,
        events: mockEvents,
        graphql: {
          resolvers: mockGraphql,
        },
      },
    };

    const mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      log: jest.fn(),
    };

    (injectEnhancedLoggerToRoutes as jest.Mock).mockReturnValue(mockRoutes);
    (instrumentRoutes as jest.Mock).mockReturnValue(mockRoutes);
    (injectEnhancedLoggerToEvents as jest.Mock).mockReturnValue(mockEvents);
    (instrumentEvents as jest.Mock).mockReturnValue(mockEvents);
    const mockInjectEnhancedLoggerToGraphql = jest.fn();
    mockInjectEnhancedLoggerToGraphql.mockReturnValue(mockGraphql);
    const mockInstrumentGraphql = jest.fn();
    mockInstrumentGraphql.mockReturnValue(mockGraphql);

    const result = withFullLogger(mockService, { logger: mockLogger });
    expect(result).toBeInstanceOf(Service);


  });

  it("returns a new Service without modifying the original config if routes and events are not present", () => {
    const mockService: Service<any, any, any> = {
      config: {},
    };

    const mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      log: jest.fn(),
    };

    const result = withFullLogger(mockService, { logger: mockLogger });
    expect(result).toBeInstanceOf(Service);

  });
});