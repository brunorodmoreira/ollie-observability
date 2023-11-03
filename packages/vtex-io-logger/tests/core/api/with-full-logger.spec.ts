import { Logger, Service } from "@vtex/api";
import { withFullLogger } from "../../../src/api/with-full-logger";
import { injectEnhancedLoggerToRoutes } from "../../../src/core/injection/inject-enhanced-logger-to-routes";
import { instrumentRoutes } from "../../../src/core/instrumentation/routes/instrument-routes";
import { interceptNativeLogger } from "../../../src/core/interceptors/intercept-native-logger";

jest.mock("@vtex/api");
jest.mock("../../../src/core/injection/inject-enhanced-logger-to-routes");
jest.mock("../../../src/core/instrumentation/routes/instrument-routes");
jest.mock("../../../src/core/interceptors/intercept-native-logger");

describe("withFullLogger", () => {
  beforeEach(() => {
    (interceptNativeLogger as jest.Mock).mockClear();
  });
  it("calls dependencies with correct arguments and returns a new Service", () => {
    const mockRoutes = {};

    const mockService: Service<any, any, any> = {
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

  it("does not call interceptNativeLogger when logger is an instance of VTEX Logger and interceptVtexLogger is true", () => {
    const mockLogger = new Logger({
      account: "test",
      workspace: "test",
      operationId: "test",
      requestId: "test",
      production: false,
    });

    const mockRoutes = {};

    const mockService: Service<any, any, any> = {
      config: {
        routes: mockRoutes,
      },
    };

    const options = { logger: mockLogger, interceptVtexLogger: true };

    withFullLogger(mockService, options);

    expect(interceptNativeLogger).not.toHaveBeenCalled();
  });

  it("calls interceptNativeLogger when logger is not an instance of VTEX Logger and interceptVtexLogger is true", () => {
    const mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      log: jest.fn(),
    };
    const options = { logger: mockLogger, interceptVtexLogger: true };

    const mockRoutes = {};

    const mockService: Service<any, any, any> = {
      config: {
        routes: mockRoutes,
      },
    };

    withFullLogger(mockService, options);

    expect(interceptNativeLogger).toHaveBeenCalled();
  });

  it("does not call interceptNativeLogger when interceptVtexLogger is false", () => {
    const mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      log: jest.fn(),
    };
    const options = { logger: mockLogger, interceptVtexLogger: false };

    const mockRoutes = {};

    const mockService: Service<any, any, any> = {
      config: {
        routes: mockRoutes,
      },
    };

    withFullLogger(mockService, options);

    expect(interceptNativeLogger).not.toHaveBeenCalled();
  });
});
