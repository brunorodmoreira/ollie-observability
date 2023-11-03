import { Service } from "@vtex/api";
import { withEnhancedLogger } from "../../../dist";
import { injectEnhancedLoggerToRoutes } from "../../../src/core/injection/injectEnhancedLoggerToRoutes";
import { instrumentRoutes } from "../../../src/core/instrumentation/routes/instrumentRoutes";

jest.mock("@vtex/api"); // path to Service
jest.mock("../../../src/core/injection/injectEnhancedLoggerToRoutes"); // path to injectEnhancedLoggerToRoutes
jest.mock("../../../src/core/instrumentation/routes/instrumentRoutes"); // path to instrumentRoutes

describe("withEnhancedLogger", () => {
  it("calls dependencies with correct arguments and returns a new Service", () => {
    const mockRoutes = {};

    const mockService = {
      config: {
        routes: mockRoutes,
      },
    };

    const mockLogger = {};

    mockService.config = { routes: mockRoutes };
    (injectEnhancedLoggerToRoutes as jest.Mock).mockReturnValue(mockRoutes);
    (instrumentRoutes as jest.Mock).mockReturnValue(mockRoutes);

    const result = withEnhancedLogger(mockService, { logger: mockLogger });

    expect(result).toBeInstanceOf(Service);
  });
});
