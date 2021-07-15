import { Context, Next, Request } from 'koa'
import Joi, { Schema } from 'joi'
import defaultsDeep from 'lodash/defaultsDeep'
import intersection from 'lodash/intersection'
import assignIn from 'lodash/assignIn'
import forEach from 'lodash/forEach'
import { DEFAULT_VALIDATE_KEYS } from './const'
import CelebrateError from './celebrate-error'

const getContextValue = (key: string, ctx: Context) => {
  const req = ctx.request as Request & {
    body: any,
    files: any
  }
  if (key === 'body') {
    return req.body || {}
  }
  if (key === 'files') {
    return req.files || {}
  }
  return ctx[key]
}

export const celebrate = (validators: Record<string, Schema> = {}, opts = {}) => {
  const options = defaultsDeep(opts, {
    allowUnknown: false
  });

  return async (ctx: Context, next: Next) => {
    const needValidateKeys = intersection(
      DEFAULT_VALIDATE_KEYS,
      Object.keys(validators)
    );
    const errors: any[] = [];
    needValidateKeys.find(key => {
      const schema = validators[key]
      if (!Joi.isSchema(schema)) throw new Error(`the key ${key} validate schema must be Joi schema`)

      const data = getContextValue(key, ctx)

      const result = schema.validate(data, options);
      if (result.error) {
        errors.push(result.error.details[0]);
        return true;
      }
      assignIn(data, result.value);
      return false;
    });
    if (errors.length !== 0) {
      throw new CelebrateError(errors);
    }
    await next();
  };
}

export const extendKeys = (keys: string[]) => forEach(keys, key => {
  if (!DEFAULT_VALIDATE_KEYS.includes(key)) DEFAULT_VALIDATE_KEYS.push(...keys)
})
