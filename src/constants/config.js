let clientId = '6ad6eb46-e23e-4a6d-8a89-99e5c00d41c3'
let providerUri = 'https://oauth.octoblu.dev'
let meshbluHostname = 'meshblu.octoblu.dev'
let meshbluPort = 443

if (process.env.NODE_ENV === 'production') {
  clientId = '123'
  providerUri = 'https://oauth.octoblu.com'
  meshbluHostname = 'meshblu.octoblu.com'
  meshbluPort = 443
}

export const CLIENT_ID        = clientId
export const PROVIDER_URI     = providerUri
export const MESHBLU_HOSTNAME = meshbluHostname
export const MESHBLU_PORT     = meshbluPort
