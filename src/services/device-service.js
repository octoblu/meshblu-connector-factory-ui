import { getMeshbluConfig } from '../helpers/authentication';
import { getConnectorName } from '../helpers/connector-metadata';
import _ from 'lodash';

export function registerConnector({ connector, schema }, callback) {
  const meshbluConfig = getMeshbluConfig();
  const meshblu = new MeshbluHttp(meshbluConfig);
  const connectorName = getConnectorName(connector);
  const deviceProps = _.defaults({
    type: `device:${connectorName}`,
    connector: connector,
    discoverWhitelist: [meshbluConfig.uuid],
    configureWhitelist: [meshbluConfig.uuid],
    sendWhitelist: [meshbluConfig.uuid],
    receiveWhitelist: [meshbluConfig.uuid],
  }, schema);
  meshblu.register(deviceProps, callback);
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

export function sendPing({ uuid }, callback) {
  sendMessage({
    devices: [uuid],
    topic: 'ping',
  }, callback);
}
