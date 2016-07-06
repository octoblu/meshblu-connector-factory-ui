import MeshbluHttp from 'browser-meshblu-http';
import { getMeshbluConfig } from '../helpers/authentication';

export function updateDevice({ uuid, properties }, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.update(uuid, properties, callback);
}

export function updateDeviceDangerously({ uuid, properties }, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.updateDangerously(uuid, properties, callback);
}

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
  }, (error, device) => {
    if (error) return callback(error)
    callback(null, device.uuid)
  })
}

function afterRegisterConnector({ statusDeviceUUID, uuid }, callback) {
  const properties = {
    $set: {
      statusDevice: statusDeviceUUID,
    },
    $addToSet: {
      'octoblu.links': {
        url: `https://connector-factory.octoblu.com/connectors/configure/${uuid}`,
        title: 'View in Connector Factory',
      },
    },
  }
  updateDeviceDangerously({ uuid, properties }, callback)
}

export function registerConnector({ properties }, callback) {
  const meshbluConfig = getMeshbluConfig();
  const meshblu = new MeshbluHttp(meshbluConfig);
  const owner = meshbluConfig.uuid
  meshblu.register(properties, (error, device) => {
    if (error != null) return callback(error)
    const { uuid } = device
    registerStatusDevice({ owner, uuid }, (error, statusDeviceUUID) => {
      if (error != null) return callback(error)
      afterRegisterConnector({ uuid, statusDeviceUUID }, (error) => {
        if (error != null) return callback(error)
        callback(null, device)
      })
    })
  });
}

export function getDevice({ uuid }, callback) {
  const meshblu = new MeshbluHttp(getMeshbluConfig());
  meshblu.device(uuid, callback);
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
  const query = {
    owner: meshbluConfig.uuid,
    connectorMetadata: { $exists: true },
    type: { $ne: 'device:gateblu' },
  }
  const projection = {
    uuid: true,
    name: true,
    type: true,
    online: true,
    lastPong: true,
    connectorMetadata: true,
    statusDevice: true,
    octoblu: true,
  }
  meshblu.search({ query, projection }, callback);
}
