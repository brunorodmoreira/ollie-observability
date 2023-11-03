import type { RouteHandler } from "@vtex/api";
import { enhancedLoggerInjectionMiddlewareFactory } from "../../../src/core/injection/enhanced-logger-injection-middleware-factory";
import { injectEnhancedLoggerToRoutes } from "../../../src/core/injection/inject-enhanced-logger-to-routes";
import type { Ollie } from "../../../src/types/ollie";

jest.mock(
  "../../../src/core/injection/enhanced-logger-injection-middleware-factory"
);

describe("injectEnhancedLoggerToRoutes", () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    log: jest.fn(),
  } as Ollie.Logger;

  const mockLoggerMiddleware = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (enhancedLoggerInjectionMiddlewareFactory as jest.Mock).mockReturnValue(
      mockLoggerMiddleware
    );
  });

  it("returns the same routes when no routes are provided", () => {
    const result = injectEnhancedLoggerToRoutes(undefined, {
      logger: mockLogger,
    });

    expect(result).toBe(undefined);
  });

  it("returns enhanced routes when routes are provided and the handler is an array", () => {
    const routes = { testRoute: [jest.fn(), jest.fn()] };

    const result = injectEnhancedLoggerToRoutes(routes, { logger: mockLogger });

    const testRouteHandlers = result?.testRoute as RouteHandler[];
    expect(testRouteHandlers[0]).toBe(mockLoggerMiddleware);
  });

  it("returns enhanced routes when routes are provided and the handler is a function", () => {
    const routes = { testRoute: jest.fn() };

    const result = injectEnhancedLoggerToRoutes(routes, { logger: mockLogger });

    const testRouteHandlers = result?.testRoute as RouteHandler[];
    expect(testRouteHandlers[0]).toBe(mockLoggerMiddleware);
  });
});
