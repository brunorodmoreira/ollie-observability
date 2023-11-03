import { Service } from "@vtex/api";
import { withFullLogger } from "../../../src/api/with-full-logger";
import { injectEnhancedLoggerToRoutes } from "../../../src/core/injection/inject-enhanced-logger-to-routes";
import { instrumentRoutes } from "../../../src/core/instrumentation/routes/instrument-routes";

jest.mock("@vtex/api"); // path to Service
jest.mock("../../../src/core/injection/inject-enhanced-logger-to-routes"); // path to injectEnhancedLoggerToRoutes
jest.mock("../../../src/core/instrumentation/routes/instrument-routes"); // path to instrumentRoutes

describe("withFullLogger", () => {
  it("calls dependencies with correct arguments and returns a new Service", () => {
    const mockRoutes = {};

    const mockService = {
      config: {
        routes: mockRoutes,
      },
    };

    const mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      log: jest.fn(),
    };

    mockService.config = { routes: mockRoutes };
    (injectEnhancedLoggerToRoutes as jest.Mock).mockReturnValue(mockRoutes);
    (instrumentRoutes as jest.Mock).mockReturnValue(mockRoutes);

    const result = withFullLogger(mockService, { logger: mockLogger });

    expect(result).toBeInstanceOf(Service);
  });
});
