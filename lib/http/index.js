'use strict'

const got = require('got')

function request (method, uri, token, format) {
  const url = `${uri}.${format}?auth_token=${token}`
  console.log(url)
  return got(url, {
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