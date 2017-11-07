'use strict'

const got = require('./got-wrapper')
const { stub } = require('sinon')
const { expect } = require('code')
const Http = require('.')

describe('http', () => {
  class MyApi extends Http {}

  beforeEach(() => {
    stub(got, 'request')
  })

  afterEach(() => {
    got.request.restore()
  })

  context('base class is extended', () => {
    it('recieves request method', () => {
      const api = new MyApi()
      expect(api.get).to.be.a.function()
    })
  })

  context('request is made', () => {
    let api
    beforeEach(() => {
      api = new MyApi()
      api.url = 'http://example.net/v2/xyz'
      api.config = { 
        auth: {
          token: 'abc'
        },
        format: 'json'
      }
      api.get()
    })

    it('makes http request', () => {
      expect(got.request.callCount).to.equal(1)
    })

    it('url is correct', () => {
      expect(got.request.firstCall.args[0]).to.equal('http://example.net/v2/xyz.json?auth_token=abc')
    })

    it('uses get method', () => {
      expect(got.request.firstCall.args[1].method).to.equal('get')
    })
  })
})