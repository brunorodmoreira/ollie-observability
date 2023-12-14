import { injectEnhancedLoggerToEvents } from "../../../src/core/injection/inject-enhanced-logger-to-events";

describe("injectEnhancedLoggerToEvents", () => {

    test("should return the enhanced events with logger middleware added", () => {
        const events = {
            event1: jest.fn(),
            event2: [jest.fn(), jest.fn()],
            event3: jest.fn(),
        };
        const options = {};

        const result = injectEnhancedLoggerToEvents(events, options);

        expect(result).not.toBe(events);
        expect(result?.event1).toHaveLength(2);
    });

});