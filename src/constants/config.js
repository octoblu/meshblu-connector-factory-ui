let clientId = '387d6938-5d8b-435e-8a74-187cfd247c03'

if (process.env.NODE_ENV === 'production') {
  clientId = '8ea4bd2e-2a72-4f81-aa4e-4bc141bbf06d'
}

export const CLIENT_ID        = clientId
export const PROVIDER_URI     = 'https://oauth.octoblu.com'
export const MESHBLU_HOSTNAME = 'meshblu.octoblu.com'
export const MESHBLU_PORT     = 443
export const OCTOBLU_API_URL  = 'https://api.octoblu.com'
export const OCTOBLU_APP_URL  = 'https://app.octoblu.com'
export const CONNECTOR_SERVICE_URI = 'https://connector.octoblu.com'
export const CONNECTOR_FACTORY_UI = 'https://connector-factory.octoblu.com'
export const OCTOBLU_OFFICIAL_REGISTRY = 'https://raw.githubusercontent.com/octoblu/meshblu-connector-official-registry/master/registry.json'
