import { instrumentEvents } from "../../../../src/core/instrumentation/events/instrument-events";
import type { Ollie } from "../../../../src/types/ollie";

describe("instrumentEvents", () => {
    it("should enhance the events with fullLoggingMiddleware", () => {
        const events = {
            route1: [jest.fn()],
            route2: [jest.fn(), jest.fn()],
        };
        const logger = {
            info: jest.fn(),
            error: jest.fn(),
            debug: jest.fn(),
            warn: jest.fn(),
            log: jest.fn(),
        } as Ollie.Logger;

        const result = instrumentEvents(events, logger);

        expect(result).not.toBe(events);
        expect(result).toEqual({
            route1: [expect.any(Function), expect.any(Function)],
            route2: [expect.any(Function), expect.any(Function), expect.any(Function)],
        });
    });

});