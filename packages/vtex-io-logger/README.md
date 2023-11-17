# @ollie-dev/vtex-io-logger

`@ollie-dev/vtex-io-logger` is an npm package designed to enhance the logging and observability capabilities for VTEX IO developers and clients. It offers a streamlined and flexible way to integrate advanced logging functionalities into your VTEX IO applications.

## Features

- **Easy Integration**: Quickly add comprehensive logging to your package with minimal setup.
- **Flexible Middleware**: Manually inject the logger at the route level for fine-grained control.
- **Extended Context**: Use `ContextWithOllie` to extend the native `ServiceContext` from VTEX IO with the `ollie` logger.
- **Custom Logger Support**: Easily integrate with external logging systems like Pino and OpenSearch.

## Installation

```bash
npm install @ollie-dev/vtex-io-logger
```

## Usage

### Basic Usage

Simply import and use withFullLogger to add logging to your service:

```typescript
import { withFullLogger } from "@ollie-dev/vtex-io-logger";

// Your service setup
const service = new Service({
  // ... your configurations
});

export default withFullLogger(service);
```

### Typing with ContextWithOllie

Enhance TypeScript support by declaring the global context:

```typescript
import { ContextWithOllie } from "@ollie-dev/vtex-io-logger";

declare global {
  type Context = ContextWithOllie<Clients, State>;
}
```

Then Typescript won't complain if you try to access the logger from the context:

```typescript
export async function myCoolMiddleware(ctx: Context, next: () => Promise<any>) {
  const {
    ollie: { logger },
  } = ctx;

  logger.info({
    message: "Better than console.log() 🎉",
  });

  await next();
}
```

### Custom Logger Integration

To use a custom logger, simply pass it as an argument:

```typescript
import pino from "pino";
const logger = pino();

export default withFullLogger(service, { logger });
```

### Connecting with External Loggers

Integrate with external logging systems like OpenSearch:

```typescript
import pino from "pino";
import pinoOpenSearch from "pino-opensearch";

const streamToOpenSearch = pinoOpenSearch({
  // ... OpenSearch configurations
});

const logger = pino({ level: "error" }, streamToOpenSearch);

export default withFullLogger(service, { logger });
```

Don't forget to create an outbound access policy to your external URL in `manifest.json`

## API

- **withFullLogger**: Automatically adds logging capability to your service.
- **loggerMiddleware**: Allows for manual injection of the logger at the route level.
- **ContextWithOllie**: Extends the native `ServiceContext` with `ollie` logger for better TypeScript support.

## Contributing

Contributions are welcome! Please see our [Contributing](https://github.com/brunorodmoreira/ollie-observability/blob/main/CONTRIBUTING.md) Guide for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/brunorodmoreira/ollie-observability/blob/main/LICENSE) file for details.
