import jwt from '@jlinc/jwt'
import { b64toMultibase } from './util.js'

export default function createDidDocument(options = {}) {
  const { keys, did, serverSecret } = options
  if (!did) throw new Error('did is required')
  if (!/^did:jlinx:[\w\-]+$/.test(did)) throw new Error('incorrect JLINX DID format')
  if (!keys) throw new Error('keys is required')
  if (!keys.signingPublicKey) throw new Error('keys.signingPublicKey is required')
  if (!keys.signingPrivateKey) throw new Error('keys.signingPrivateKey is required')
  if (!keys.encryptingPublicKey) throw new Error('keys.encryptingPublicKey is required')
  if (!keys.encryptingPrivateKey) throw new Error('keys.encryptingPrivateKey is required')

  const created = new Date().toISOString()

  const didDocument = {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: did,
    created,
    verificationMethod: [
      {
        id: `${did}#signing`,
        type: 'Ed25519VerificationKey2020',
        controller: did,
        publicKeyMultibase: b64toMultibase(keys.signingPublicKey),
      },
    ],
    "keyAgreement": [
      {
        id: `${did}#encrypting`,
        type: 'X25519KeyAgreementKey2019',
        controller: did,
        publicKeyMultibase: b64toMultibase(keys.encryptingPublicKey),
      },
    ],
    "authentication": [
      `${did}#signing`,
    ],
  }

  if (typeof serverSecret === 'undefined' || !serverSecret) {
    return didDocument
  }

  const Jwt = jwt.signEdDsa({didDocument, serverSecret}, keys.signingPublicKey, keys.signingPrivateKey)
  return Jwt
}
