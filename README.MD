## Node LingoHub Client

[![Build Status](https://travis-ci.org/antony/lingohub.svg?branch=master)](https://travis-ci.org/antony/lingohub)

Unofficial client library to translate apps with [LingoHub](https://lingohub.com/).

This library implements most common API functionality.

### Install

``` bash
npm install --save-dev lingohub
```

### Configuration

Configuration is a plain javascript object
```javascript
const config = {
  api: {
    url: 'https://api.lingohub.com'
    version: 'v2'
  },
  auth: {
    token: 'abcdef12345'
  },
  format: 'json',
  account: 'your-account-name'
}
```

Configuration follows the following format:

| attribute   	| description                                                   	| required 	| validation              	| default                  	|
|-------------	|---------------------------------------------------------------	|----------	|-------------------------	|--------------------------	|
| api*        	| api config                                                    	| false    	| -                       	| -                        	|
| api.url     	| url to lingohub api (useful for mocking their api)            	| false    	| must be an url          	| https://api.lingohub.com 	|
| api.version 	| lingohub api version                                          	| false    	| must be 'v1'            	| v1                       	|
| auth.token  	| your lingohub api token                                       	| true     	| required                	| -                        	|
| format      	| translation download format                                   	| false    	| must be 'json' or 'xml' 	| json                     	|
| account     	| lingohub account id (account name, dash separated, lowercase) 	| true     	| regex: a-z0-9-          	| -                        	|

* the whole api block is optional. Most people will want to leave it out entirely.

### Usage

Usage of the api is like a waterfall. At any point you can call `.get()` to call the API and return the result.

#### Getting project information

```javascript
  const LingoHub = require('lingohub')
  const config = { ... }

  const client = await LingoHub.create(config)
  await client.project('project-id').get()
```

Where `project-id` is the id of the project you want to get information for.

#### Getting project resources

```javascript
  const LingoHub = require('lingohub')
  const config = { ... }

  const client = await LingoHub.create(config)
  await client.project('project-id').resources().get()
```

Where `project-id` is the id of the project you want to get information for.

#### Downloading a project resource

```javascript
  const LingoHub = require('lingohub')
  const config = { ... }

  const client = await LingoHub.create(config)
  await client.project('project-id').resources().download('filename').get()
```

Where `project-id` is the id of the project you want to get information for, and `filename` is the name of the file to download.

### Developing

The project is laid out according to basic node conventions.

You can run the tests by doing:

```bash
npm test
```

Feel free to submit a PR, but please ensure any functionality comes with passing unit tests.

### Maintainers

* Antony Jones (https://github.com/antony)

## License

MIT License. Copyright 2017 Antony Jones
