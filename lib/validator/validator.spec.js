'use strict'

const { omit } = require('lodash')
const { validate } = require('./validator')
const { expect, fail } = require('code')

describe('validator', () => {
  const validConfig = {
    api: {
      url: 'https://example.net/xyz',
      version: 'v1'
    },
    auth: {
      token: 'abcde'
    },
    format: 'xml',
    account: 'herp'
  }

  context('Defaulted values', () => {
    const scenarios = [
      { scenario: 'defaults api url', without: ['api.url'] },
      { scenario: 'defaults api version', without: ['api.version'] },
      { scenario: 'defaults api stanza', without: ['api'] },
      { scenario: 'defaults request format', without: ['format'] }
    ]

    scenarios.forEach(({ scenario, without }) => {
      it(scenario, async () => {
        const output = await validate(omit(validConfig, without))
        expect(output).to.be.an.object()
      })
    })
  })

  context('Missing required values', () => {
    const scenarios = [
      { scenario: 'missing account', without: ['account'] },
      { scenario: 'missing auth stanza', without: ['auth'] },
      { scenario: 'missing auth token', without: ['auth.token'] }
    ]

    scenarios.forEach(({ scenario, without }) => {
      it(scenario, async () => {
        try {
          validate(omit(validConfig, without))
          fail('expected an error')
        } catch (e) {
          expect(e).to.be.an.error()
        }
      })
    })
  })

  context('Invalid values', () => {
    const scenarios = [
      { scenario: 'api.url is not an url', changes: { api: { url: 'xxx' } } },
      { scenario: 'format is not json', changes: { format: 'rss' } },
      { scenario: 'api version is not v1', changes: { api: { version: 'v2' } } }
    ]

    scenarios.forEach(({ scenario, changes }) => {
      it(scenario, async () => {
        try {
          validate(Object.assign({}, validConfig, changes))
          fail('expected an error')
        } catch (e) {
          expect(e).to.be.an.error()
        }
      })
    })
  })
})
