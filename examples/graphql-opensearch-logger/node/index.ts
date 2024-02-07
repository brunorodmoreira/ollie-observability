import type { ClientsConfig } from '@vtex/api';
import { LRUCache, Service, method } from '@vtex/api';
import { prop } from 'ramda';

import logger from "./lib/logger";

import { ContextWithOllie, withFullLogger } from "@ollie-dev/vtex-io-logger";
import { Clients } from './clients';
import { status } from "./middlewares/status";
import { validate } from "./middlewares/validate";
import { book } from './resolvers/book';
import { books } from './resolvers/books';
import { deleteBook } from './resolvers/delete';
import { editBook } from './resolvers/editBook';
import { newBook } from './resolvers/newBook';
import { source } from './resolvers/source';
import { total } from './resolvers/total';

const MEDIUM_TIMEOUT_MS = 2 * 1000


// Create a LRU memory cache for the Status client.
// The 'max' parameter sets the size of the cache.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
// Note that the response from the API being called must include an 'etag' header
// or a 'cache-control' header with a 'max-age' value. If neither exist, the response will not be cached.
// To force responses to be cached, consider adding the `forceMaxAge` option to your client methods.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: MEDIUM_TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ContextWithOllie<Clients>

}

// Export a service that defines resolvers and clients' options
const service = new Service({
  clients,
  graphql: {
    resolvers: {
      Book: {
        cacheId: prop('id'),
      },
      Mutation: {
        delete: deleteBook,
        editBook,
        newBook,
      },
      Query: {
        book,
        books,
        source,
        total,
      },
    },
  },
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    status: method({
      GET: [validate, status],
    }),
  },
})


//console.log(service.config.routes?.status)
//console.log(service.config.graphql?.resolvers?.Query)
console.log(service.config.graphql?.resolvers?.Query)
console.log(service.config.graphql?.resolvers?.Mutation)
console.log(service.config.graphql)
console.log(service.config.graphql?.resolvers)
export default withFullLogger(service, { logger });
