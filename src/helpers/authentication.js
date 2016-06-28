import url from 'url';
import cookie from 'react-cookie';
import moment from 'moment';
import MeshbluHttp from 'browser-meshblu-http/dist/meshblu-http.js';

import {
  CLIENT_ID,
  PROVIDER_URI,
  MESHBLU_PORT,
  MESHBLU_HOSTNAME,
} from '../constants/config';

export function getBearerToken() {
  return cookie.load('meshbluBearerToken');
}

export function getMeshbluConfig() {
  const bearerToken = getBearerToken();
  if (!bearerToken) {
    return {
      host: MESHBLU_HOSTNAME,
      port: MESHBLU_PORT,
    }
  }
  const parts = atob(bearerToken).split(':');
  return {
    hostname: MESHBLU_HOSTNAME,
    port: MESHBLU_PORT,
    uuid: parts[0],
    token: parts[1],
  };
}

export function fetchOctobluUser(callback) {
  if (!getBearerToken()) {
    return callback();
  }

  const meshbluConfig = getMeshbluConfig();
  const meshbluHttp = new MeshbluHttp(meshbluConfig);
  return meshbluHttp.whoami(callback);
}

export function storeAuthentication(nextState, replace) {
  const { access_token, redirect_uri } = nextState.location.query;
  const bearerToken = decodeURIComponent(access_token);
  const cookieOptions = {
    path: '/',
    expires: moment().add(1, 'year').toDate(),
  }
  cookie.save('meshbluBearerToken', bearerToken, cookieOptions);
  replace(redirect_uri);
}

export function hasAuth() {
  return !!getBearerToken()
}

export function removeCookie() {
  cookie.remove('meshbluBearerToken', { path: '/' });
}

export function logout(nextState, replace) {
  removeCookie()
  replace('/')
  window.location.reload()
}

export function buildRedirectUri() {
  const { pathname, query } = url.parse(window.location.href);
  return url.format({ pathname, query });
}

export function buildAuthenticateRedirectUri() {
  const { protocol, hostname, port } = window.location;
  const pathname = '/authenticated';

  const query = {
    redirect_uri: buildRedirectUri(),
  };

  return url.format({
    protocol,
    hostname,
    port,
    pathname,
    query,
  });
}

export function getAuthenticationUri() {
  const { protocol, host, port } = url.parse(PROVIDER_URI);
  return url.format({
    protocol,
    host,
    port,
    pathname: '/authorize',
    query: {
      client_id: CLIENT_ID,
      redirect_uri: buildAuthenticateRedirectUri(),
      response_type: 'token',
    },
  });
}
