import { Context as _Context, Request as _Request } from 'koa'

declare global {
  namespace Koa {
    export interface Request extends _Request {
      body?: any,
      files?: any
    }
  }
}
