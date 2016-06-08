import MeshbluHttp from 'browser-meshblu-http/dist/meshblu-http.js';
import { getMeshbluConfig } from '../helpers/authentication';
import { getConnectorName } from '../helpers/connector-metadata';
import _ from 'lodash';

export function registerStatusDevice({ owner, uuid }, callback) {
  const meshbluConfig = getMeshbluConfig()
  const meshblu = new MeshbluHttp(meshbluConfig)
  meshblu.register({
    type: 'connector-status-device',
    owner: uuid,
    discoverWhitelist: [uuid, owner],
    configureWhitelist: [uuid, owner],
    sendWhitelist: [uuid, owner],
    receiveWhitelist: [uuid, owner],
  }, callback)
}

export function registerConnector({ connector, version, customProps }, callback) {
  const meshbluConfig = getMeshbluConfig();
  const meshblu = new MeshbluHttp(meshbluConfig);
  const connectorName = getConnectorName(connector);
  const owner = meshbluConfig.uuid
  const deviceProps = _.assign({
    type: `device:${connectorName}`,
    connector,
    owner,
    discoverWhitelist: [owner],
    configureWhitelist: [owner],
    sendWhitelist: [owner],
    receiveWhitelist: [owner],
    connectorMetadata: {
      stopped: false,
      version,
    },
  }, customProps);
  meshblu.register(deviceProps, (error, device) => {
    if (error != null) return callback(error)
    const { uuid } = device
    registerStatusDevice({ owner, uuid }, (error) => {
      if (error != null) return callback(error)
      callback(null, device)
    })
  });
}

export function getDevice({ uuid }, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.device(uuid, callback);
}

export function updateDevice({ uuid, properties }, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.update(uuid, properties, callback);
}

export function sendMessage(message, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.message(message, callback);
}

export function generateAndStoreToken({ uuid }, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.generateAndStoreToken(uuid, {}, callback);
}

export function getDevices(callback) {
  const meshbluConfig = getMeshbluConfig();
  const meshblu = new MeshbluHttp(meshbluConfig);
  meshblu.devices({
    owner: meshbluConfig.uuid,
    connector: { $exists: true },
    type: { $ne: 'device:gateblu' },
  }, callback);
}
