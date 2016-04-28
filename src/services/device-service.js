import { getMeshbluConfig } from '../helpers/authentication'
import { getConnectorName } from '../helpers/connector-metadata'

export function registerConnector({ connector }, callback) {
  const meshbluConfig = getMeshbluConfig()
  const meshblu = new MeshbluHttp(meshbluConfig)
  const connectorName = getConnectorName(connector);
  meshblu.register({
    type: `device:${connectorName}`,
    connector: connector,
    discoverWhitelist: [meshbluConfig.uuid],
    configureWhitelist: [meshbluConfig.uuid],
    sendWhitelist: [meshbluConfig.uuid],
    receiveWhitelist: [meshbluConfig.uuid],
  }, callback)
}
