import type {
  ContextWithOllie,
  EventContextWithOllie,
} from '@ollie-dev/vtex-io-logger';
import { withFullLogger } from '@ollie-dev/vtex-io-logger';
import type { ClientsConfig, RecorderState } from "@vtex/api";
import { LRUCache, Service, method } from "@vtex/api";
import { Clients } from "./clients";
import logger from "./lib/logger";
import { allStates } from "./middlewares/allStates";
import { status } from "./middlewares/status";
import { validate } from "./middlewares/validate";

const TIMEOUT_MS = 5000;

// Create a LRU memory cache for the Status client.
// The 'max' parameter sets the size of the cache.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
// Note that the response from the API being called must include an 'etag' header
// or a 'cache-control' header with a 'max-age' value. If neither exist, the response will not be cached.
// To force responses to be cached, consider adding the `forceMaxAge` option to your client methods.
const memoryCache = new LRUCache<string, any>({ max: 5000 });

metrics.trackCache("status", memoryCache);

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
};

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ContextWithOllie<Clients, State>;

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number;
  }

  interface StatusChangeContext extends EventContextWithOllie<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }
}

// Export a service that defines route handlers and client options.
const service = new Service({
  clients,
  events: {
    allStates,
    someStates: [allStates],
  },
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    status: method({
      GET: [validate, status],
    }),
  },
});

export default withFullLogger(service, { logger });
