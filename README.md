# Node JLINX

A node client to create JLINX DIDs


### DID client

Recieves a Hypercore addressed DID and produces a DID document.

## Expected Usage

```js
const jlinxDid = require('./jlinx-did');

// create end-user's secret keys and store them safely
const keys = jlinxDid.createKeys();

// get a DID string and a secret from a Hypercore enabled server
// returns a JWT that should be sent back to the server
const result = jlinxDid.createDidDoc({ keys, did, serverSecret })

// the server should do this with the JWT
const jwt = require('@jlinc/jwt');
const b64 = require('urlsafe-base64');

const verified = jwt.verifyEdDsa(result);
// insure that the serverSecret === verified.payload.serverSecret

const checkKey = verified.payload.didDocument.verificationMethod.find((item) => /#signing$/.test(item.id)).publicKeyMultibase;

// this MUST return true (assumes publicKeyMultibase key is in base64url format)
b64.decode(checkKey.substring(1,checkKey.length)).equals(b64.decode(verified.header.jwk.x));
```

## TODO:  tests!
