'use strict';

module.exports = function(b64String){
  if (/^[A-Za-z0-9\-_]+$/.test(b64String)) {
      return 'u' + b64String;
  } else {
    throw new Error(`argument must be a base64url string`)
  }
};