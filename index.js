'use strict'

const Client = require('./lib/client')
const validator = require('./lib/validator')

exports.create = function (options) {
  return validator
    .validate(options)
    .then(credentials => {
      return new Client(credentials)
    })
}
