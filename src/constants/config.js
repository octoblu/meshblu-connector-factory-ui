let clientId = '387d6938-5d8b-435e-8a74-187cfd247c03';
let providerUri = 'https://oauth.octoblu.com';
let meshbluHostname = 'meshblu.octoblu.com';
let meshbluPort = 443;

if (process.env.NODE_ENV === 'production') {
  clientId = '123';
  providerUri = 'https://oauth.octoblu.com';
  meshbluHostname = 'meshblu.octoblu.com';
  meshbluPort = 443;
}

export const CLIENT_ID        = clientId;
export const PROVIDER_URI     = providerUri;
export const MESHBLU_HOSTNAME = meshbluHostname;
export const MESHBLU_PORT     = meshbluPort;
