import { loggerMiddleware } from "../../../src/api/logger-middleware";
import { enhancedLoggerInjectionMiddlewareFactory } from "../../../src/core/injection/enhanced-logger-injection-middleware-factory";

jest.mock(
  "../../../src/core/injection/enhanced-logger-injection-middleware-factory"
);

describe("loggerMiddleware", () => {
  it("calls enhancedLoggerInjectionMiddlewareFactory with correct arguments", () => {
    const mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      log: jest.fn(),
    };

    loggerMiddleware({ logger: mockLogger });

    expect(enhancedLoggerInjectionMiddlewareFactory).toHaveBeenCalledWith({
      logger: mockLogger,
    });
  });
});
