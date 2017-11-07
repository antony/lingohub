'use strict'

const Http = require('../http')

class Client {
  constructor (config) {
    const { url, version } = config.api
    this.url = `${url}/${version}`
    this.config = config
  }

  project (id) {
    return new Project(this, id)
  }
}

class Project extends Http {
  constructor (client, id) {
    super()
    const { account } = client.config
    this.url = `${client.url}/${account}/projects/${id}`
    this.config = client.config
  }

  resources () {
    return new Resources(this)
  }
}

class Resources extends Http {
  constructor (project) {
    super()
    this.config = project.config
    this.url = `${project.url}/resources`
  }

  download (filename) {
    return new Download(this, filename)
  }
}

class Download extends Http {
  constructor (resources, filename) {
    super()
    this.config = resources.config
    this.url = `${resources.url}/${filename}`
  }
}

module.exports = Client