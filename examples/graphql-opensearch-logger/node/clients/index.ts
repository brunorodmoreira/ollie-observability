import { IOClients } from '@vtex/api'

import { BookClient } from './book'
import { MarkdownClient } from './markdown'
import Status from './status'

export class Clients extends IOClients {
  public get book() {
    return this.getOrSet('book', BookClient)
  }

  public get markdown() {
    return this.getOrSet('markdown', MarkdownClient)
  }
  public get status() {
    return this.getOrSet('status', Status)
  }
}
