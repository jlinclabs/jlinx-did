'use strict';

module.exports =  {
  version: require('../package.json').version,
  contextUrl: 'https://www.w3.org/ns/did/v1',

  now: require('./now'),
  b64toMultibase: require('./b64toMultibase'),
  createKeys: require('./createKeys'),
  createDidDoc: require('./createDidDoc'),
};
