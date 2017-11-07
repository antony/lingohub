'use strict'

const got = require('got')

exports.request = function (url, options) {
  return got(url, options)
}
