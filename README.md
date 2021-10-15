## koa-celebrate

`koa-celebrate` is an `koa` middleware function that wraps the [joi](https://github.com/hapijs/joi/tree/master) validation library. This allows you to use this middleware in any single route, or globally, and ensure that all of your inputs are correct before any handler function. The middleware allows you to validate `ctx.request.query`, `ctx.request.headers` and `ctx.request.params`

The middleware can also validate:
- `ctx.request.body`: provided you are using body parser
- `ctx.request.file`: provided you are using form parser

By default, `koa-celebrate` will not verify other fields; however, you can extend the list of default verification fields through function `extendKeys`.


### Example Usage

Example of using `koa-celebrate` on a single POST route to validate `ctx.request.body`.

```js
import Koa from 'koa'
import koaBody from 'koa-body'
import Router from '@koa/router'
import { celebrate, Joi } from 'koa-celebrate'

const app = new Koa()
const router = new Router()
router.post('test', celebrate({
  body: Joi.object({
    name: Joi.string().required()
  })
}), (ctx, next) => {
  // ...
})
app.use(router.routes())
```

Example of using `koa-celebrate` to validate all incoming requests to ensure the token header is present and matches the supplied regular expression.

```js
import Koa from 'koa'
import { celebrate, Joi } from 'koa-celebrate'

const app = new Koa()
app.use(celebrate({
  headers: Joi.object({
    authorization: Joi.string().regex(/^Bearer\s.+/).required()
  })
}))
```
