'use strict'

const Joi = require('joi')

const schema = Joi.object({
  api: Joi.object({
    url: Joi.string().uri().optional().default('https://api.lingohub.com').description('LingoHub API url'),
    version: Joi.string().only('v2').optional().default('v2').description('LingoHub API version')
  }).optional().default(),
  auth: Joi.object({
    token: Joi.string().required().required('API Token')
  }).required().description('Authentication Configuration'),
  format: Joi.string().optional().only('json', 'xml').default('json').description('Response format'),
  account: Joi.string().required().regex(/[a-z0-9\-]+/).description('Account name')
})

exports.validate = function (options) {
  return Joi.validate(options, schema)
}