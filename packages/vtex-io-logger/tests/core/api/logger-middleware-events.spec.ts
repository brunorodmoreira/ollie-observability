import { loggerMiddlewareEvents } from "../../../src/api/logger-middleware-events";
import { enhancedLoggerInjectionEventsMiddlewareFactory } from "../../../src/core/injection/enhanced-logger-injection-middleware-factory";

jest.mock("../../../src/core/injection/enhanced-logger-injection-middleware-factory", () => ({
    enhancedLoggerInjectionEventsMiddlewareFactory: jest.fn(),
}));

describe("loggerMiddlewareEvents", () => {
    test("should call enhancedLoggerInjectionEventsMiddlewareFactory with the provided options", () => {
        const options = { /* your options here */ };

        loggerMiddlewareEvents(options);

        expect(enhancedLoggerInjectionEventsMiddlewareFactory).toHaveBeenCalledWith(options);
    });

    test("should call enhancedLoggerInjectionEventsMiddlewareFactory with default options when no options are provided", () => {
        loggerMiddlewareEvents();

        expect(enhancedLoggerInjectionEventsMiddlewareFactory).toHaveBeenCalledWith({});
    });
});