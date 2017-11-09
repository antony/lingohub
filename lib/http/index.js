'use strict'

const got = require('./got-wrapper')

function request (method, uri, token, format) {
  const isJson = format === 'json'
  const url = `${uri}.${format}?auth_token=${token}`
  return got.request(url, {
    json: isJson,
    method
  })
}

class Http {
  get () {
    const { url, config: { auth, format } } = this
    return request('get', url, auth.token, format)
  }
}

module.exports = Http