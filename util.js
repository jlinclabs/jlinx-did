import b64 from 'urlsafe-base64'

export function b64toMultibase(b64String){
  if (!b64.validate(b64String))
    throw new Error(`argument must be a base64url string`)
  return 'u' + b64String;
}
