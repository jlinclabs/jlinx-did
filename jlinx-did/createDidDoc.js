'use strict';

const jwt = require('@jlinc/jwt');

module.exports = function createDidDoc(options = {}) {
  const { keys, did, serverSecret } = options;
  if (!keys) throw new Error('keys is required');
  if (!keys.signingPublicKey) throw new Error('keys.signingPublicKey is required');
  if (!keys.signingPrivateKey) throw new Error('keys.signingPrivateKey is required');
  if (!keys.encryptingPublicKey) throw new Error('keys.encryptingPublicKey is required');
  if (!keys.encryptingPrivateKey) throw new Error('keys.encryptingPrivateKey is required');
  if (!did) throw new Error('did is required');
  if (!/^did:jlinx:[\w\-]+$/.test(did)) throw new Error('incorrect JLINX DID format');
  if (!serverSecret) throw new Error('serverSecret is required');

  const created = this.now();

  const didDocument = {
    '@context': this.contextUrl,
    id: did,
    created,
    verificationMethod: [
      {
        id: `${did}#signing`,
        type: 'Ed25519VerificationKey2020',
        controller: did,
        publicKeyMultibase: this.b64toMultibase(keys.signingPublicKey),
      },
    ],
    "keyAgreement": [
      {
        id: `${did}#encrypting`,
        type: 'X25519KeyAgreementKey2019',
        controller: did,
        publicKeyMultibase: this.b64toMultibase(keys.encryptingPublicKey),
      },
    ],
    "authentication": [
      `${did}#signing`,
    ],
  };

  const Jwt = jwt.signEdDsa({didDocument, serverSecret}, keys.signingPublicKey, keys.signingPrivateKey);
  

  return Jwt;
};
