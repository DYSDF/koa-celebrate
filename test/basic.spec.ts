import chai from 'chai'
import { Context, Next } from 'koa'
import { celebrate, Joi } from '../src/index'

chai.should()

describe('test celebrate', () => {
  const mock_ctx = {
    request: {
      body: {
        name: 'Alex',
        age: 28
      }
    },
    query: {
      search: 'search_value'
    },
    params: {
      params: 'params_value'
    }
  } as unknown
  const mock_next = () => {}

  it('should be success', done => {
    const koa_next = celebrate({
      body: Joi.object({
        name: Joi.string().min(2).max(5).required(),
        age: Joi.number().min(1).max(99),
        sex: Joi.number()
      }),
      query: Joi.object({
        search: Joi.string().required()
      }),
      params: Joi.object({
        params: Joi.string().max(20).required()
      })
    })
    koa_next(mock_ctx as Context, mock_next as Next).then(done)
  })

  it('should be failed', (done) => {
    const koa_next = celebrate({
      body: Joi.object({
        sex: Joi.number().required()
      })
    })
    koa_next(mock_ctx as Context, mock_next as Next).catch(err => done())
  })

  it('test outside keys should not work', (done) => {
    const koa_next = celebrate({
      test: Joi.any().required()
    })
    koa_next(mock_ctx as Context, mock_next as Next).then(() => done())
  })
})
