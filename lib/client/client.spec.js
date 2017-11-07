'use strict'

const { expect } = require('code')
const Client = require('.')

describe('client', () => {
  const config = {
    api: {
      url: 'x',
      version: 'y'
    },
    account: 'abcde'
  }
  const { url, version } = config

  context('Client', () => {
    let client
    beforeEach(() => {
      client = new Client(config) 
    })

    it('retains client config', () => {
      expect(client.config).to.equal(config)
    })

    it('has correct url', () => {
      expect(client.url).to.equal(`${config.api.url}/${config.api.version}`)
    })

    it('cannot be directly fetched', () => {
      expect(client.get).not.to.exist()
    })
  })

  context('Project', () => {
    let project

    const projectId = 'z'

    beforeEach(() => {
      project = new Client(config).project(projectId)
    })

    it('retains client config', () => {
      expect(project.config).to.equal(config)
    })

    it('has correct url', () => {
      expect(
        project.url
      ).to.equal(
        `${config.api.url}/${config.api.version}/${config.account}/projects/${projectId}`
      )
    })

    it('cannot be directly fetched', () => {
      expect(project.get).to.exist().and.to.be.a.function()
    })
  })

  context('Resources', () => {
    let resources

    const projectId = 'z'

    beforeEach(() => {
      resources = new Client(config).project(projectId).resources()
    })

    it('retains client config', () => {
      expect(resources.config).to.equal(config)
    })

    it('has correct url', () => {
      expect(
        resources.url
      ).to.equal(
        `${config.api.url}/${config.api.version}/${config.account}/projects/${projectId}/resources`
      )
    })

    it('cannot be directly fetched', () => {
      expect(resources.get).to.exist().and.to.be.a.function()
    })
  })

  context('Download', () => {
    let resources

    const projectId = 'z'
    const filename = 'qqq'

    beforeEach(() => {
      resources = new Client(config).project(projectId).resources().download(filename)
    })

    it('retains client config', () => {
      expect(resources.config).to.equal(config)
    })

    it('has correct url', () => {
      expect(
        resources.url
      ).to.equal(
        `${config.api.url}/${config.api.version}/${config.account}/projects/${projectId}/resources/${filename}`
      )
    })

    it('cannot be directly fetched', () => {
      expect(resources.get).to.exist().and.to.be.a.function()
    })
  })
})