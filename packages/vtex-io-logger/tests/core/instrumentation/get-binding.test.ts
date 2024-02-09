/* eslint-disable @typescript-eslint/no-empty-function -- mock */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- mock */
import { Logger, Span } from "@vtex/api";
import { getBindingsForEvents, getBindingsForGraphql } from "../../../src/core/instrumentation/get-binding";

;

describe("getBindingsForEvents", () => {
    it("returns the correct bindings for events", () => {
        const ctx = {
            vtex: {
                eventInfo: {
                    sender: "sender",
                    subject: "subject",
                    key: "key",
                },
                requestId: "requestId",
                operationId: "operationId",
                production: true,
                account: "account",
                workspace: "workspace",
                tracer: {
                    traceId: "traceId",
                },
            },
            body: { data: "example" },
        };

        const expectedBindings = {
            eventInfo: {
                sender: "sender",
                subject: "subject",
                key: "key",
                body: { data: "example" },
            },
            vtex: {
                requestId: "requestId",
                operationId: "operationId",
                production: true,
                account: "account",
                workspace: "workspace",
                traceId: "traceId",
                type: "event",
            },
        };

        const result = getBindingsForEvents({
            ...ctx,
            vtex: {
                ...ctx.vtex,
                platform: "",
                authToken: "",
                product: "",
                region: "",
                route: {
                    declarer: undefined,
                    id: "",
                    params: {},
                    type: "event"
                },
                userAgent: "",
                logger: new Logger({
                    ...ctx.vtex,
                    tracer: {
                        traceId: "traceId",
                        isTraceSampled: false,
                        startSpan: () => { return new Span(); },
                        inject: () => { },
                        fallbackSpanContext: () => undefined,
                    },
                }),
                tracer: {
                    traceId: "traceId",
                    isTraceSampled: false,
                    startSpan: () => { return new Span(); },
                    inject: () => { },
                    fallbackSpanContext: () => undefined,
                },
            },
            clients: {},
            state: {},
            timings: {},
            metrics: {},
            key: "",
            sender: "",
            subject: ""
        });

        expect(result).toEqual(expectedBindings);
    });

    it("returns the correct bindings for events when eventInfo is undefined", () => {
        const ctx = {
            vtex: {
                requestId: "requestId",
                operationId: "operationId",
                production: true,
                account: "account",
                workspace: "workspace",
                tracer: {
                    traceId: "traceId",
                },
            },
            body: { data: "example" },
        };

        const expectedBindings = {
            eventInfo: {
                sender: undefined,
                subject: undefined,
                key: undefined,
                body: { data: "example" },
            },
            vtex: {
                requestId: "requestId",
                operationId: "operationId",
                production: true,
                account: "account",
                workspace: "workspace",
                traceId: "traceId",
                type: "event",
            },
        };

        const result = getBindingsForEvents({
            ...ctx,
            vtex: {
                ...ctx.vtex,
                platform: "",
                authToken: "",
                product: "",
                region: "",
                route: {
                    declarer: undefined,
                    id: "",
                    params: {},
                    type: "event"
                },
                userAgent: "",
                logger: new Logger({
                    ...ctx.vtex,
                    tracer: {
                        traceId: "traceId",
                        isTraceSampled: false,
                        startSpan: () => { return new Span(); },
                        inject: () => { },
                        fallbackSpanContext: () => undefined,
                    },
                }),
                tracer: {
                    traceId: "traceId",
                    isTraceSampled: false,
                    startSpan: () => { return new Span(); },
                    inject: () => { },
                    fallbackSpanContext: () => undefined,
                },
            },
            clients: {},
            state: {},
            timings: {},
            metrics: {},
            key: "",
            sender: "",
            subject: ""
        });

        expect(result).toEqual(expectedBindings);
    });
})

describe("getBindingsForGraphql", () => {
    it("returns the correct bindings for graphql", () => {
        const ctx = {
            vtex: {
                requestId: "requestId",
                operationId: "operationId",
                production: true,
                account: "account",
                workspace: "workspace",
                tracer: {
                    traceId: "traceId",
                },
            },
        };

        const type = "query";
        const resolverName = "MyResolver";
        const functionName = "myFunction";

        const expectedBindings = {
            req: {
                resolverName: "MyResolver",
                type: "query",
                functionName: "myFunction",
            },
            vtex: {
                requestId: "requestId",
                operationId: "operationId",
                production: true,
                account: "account",
                workspace: "workspace",
                appId: process.env.VTEX_APP_ID,
                traceId: "traceId",
                type: "graphql",
            },
        };

        const result = getBindingsForGraphql(type, resolverName, functionName, ctx as any);

        expect(result).toEqual(expectedBindings);
    });
});