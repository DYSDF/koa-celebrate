import chai from 'chai'
import { Context, Next } from 'koa'
import { celebrate, Joi, extendKeys } from '../src/index'

chai.should()

describe('test celebrate extend validate keys', () => {
  const mock_ctx = {} as unknown
  const mock_next = () => {}

  it('should not work', done => {
    const koa_next = celebrate({
      test: Joi.any().required()
    })
    koa_next(mock_ctx as Context, mock_next as Next).then(() => done())
  })

  it('should be work', done => {
    extendKeys(['test'])
    const koa_next = celebrate({
      test: Joi.any().required()
    })
    koa_next(mock_ctx as Context, mock_next as Next).catch(() => done())
  })
})
