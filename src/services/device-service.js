import MeshbluHttp from 'browser-meshblu-http/dist/meshblu-http.js';
import { getMeshbluConfig } from '../helpers/authentication';
import { getConnectorName } from '../helpers/connector-metadata';
import _ from 'lodash';

export function registerConnector({ connector, version, customProps }, callback) {
  const meshbluConfig = getMeshbluConfig();
  const meshblu = new MeshbluHttp(meshbluConfig);
  const connectorName = getConnectorName(connector);
  const deviceProps = _.assign({
    type: `device:${connectorName}`,
    connector: connector,
    owner: meshbluConfig.uuid,
    discoverWhitelist: [meshbluConfig.uuid],
    configureWhitelist: [meshbluConfig.uuid],
    sendWhitelist: [meshbluConfig.uuid],
    receiveWhitelist: [meshbluConfig.uuid],
    connectorMetadata: {
      stopped: false,
      version: version
    }
  }, customProps);
  meshblu.register(deviceProps, callback);
}

export function getDevice({ uuid }, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.device(uuid, callback);
}

export function getStatusDevice(device, callback) {
  if(device == null) return
  if(device.statusDevice == null) return
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.device(device.statusDevice, (error, statusDevice) => {
    if(error) return callback(error)
    callback(null, _.pick(statusDevice, ['lastPong', 'online']))
  });
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

export function sendPing(device, callback) {
  if(device == null) return
  if(device.statusDevice == null) return
  sendMessage({
    devices: [device.statusDevice],
    topic: 'ping',
  }, (error) => {
    if(error) return callback(error)
    _.delay(() => {
      getStatusDevice(device, callback)
    }, 2000)
  });
}

export function getDevices(callback) {
  const meshbluConfig = getMeshbluConfig();
  const meshblu = new MeshbluHttp(meshbluConfig);
  meshblu.devices({
    owner: meshbluConfig.uuid,
    connector: { $exists: true },
    type: { $ne: 'device:gateblu' }
  }, callback);
}
