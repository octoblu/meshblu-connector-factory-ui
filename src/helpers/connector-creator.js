import _ from 'lodash'
import { getMeshbluConfig } from '../helpers/authentication'
import { getSchema } from '../services/schema-service'
import { getDefaultValues } from './default-schemas'
import { getFriendlyName, getConnectorMetadata } from './connector-metadata'
import {
  updateDevice,
  updateDeviceDangerously,
  registerConnector,
  generateAndStoreToken,
} from '../services/device-service'

import { generateOtp } from '../services/otp-service'

function generateKeyWrapper({ registryItem, connector, version, octoblu }, callback) {
  return (error, device) => {
    if (error) return callback(error)
    const { uuid, token } = device || {}
    getConnectorMetadata({ connector, githubSlug: registryItem.githubSlug, version, octoblu }, (error, metadata) => {
      if (error != null) return callback(error)
      generateOtp({ uuid, token, metadata }, (error, response) => {
        if (error != null) return callback(error)
        const { key } = response || {}
        return callback(null, { key, uuid })
      })
    })
  }
}

function updateConnector({ uuid, registryItem, version, connector, schemas }, callback) {
  const owner = getMeshbluConfig().uuid
  const properties = {
    $set: {
      type: registryItem.type,
      connector,
      owner,
      'connectorMetadata.stopped': false,
      'connectorMetadata.version': version,
      'connectorMetadata.githubSlug': registryItem.githubSlug,
      schemas,
      'octoblu.registryItem': registryItem,
    },
    $addToSet: {
      discoverWhitelist: owner,
      configureWhitelist: owner,
      sendWhitelist: owner,
      receiveWhitelist: owner,
    },
  }
  updateDeviceDangerously({ uuid, properties }, (error) => {
    if (error != null) return callback(error)
    generateAndStoreToken({ uuid }, (error, device) => {
      if (error != null) return callback(error)
      const { uuid, token } = device
      callback(null, { uuid, token })
    })
  })
}

function createConnector({ registryItem, version, connector, schemas }, callback) {
  const owner = getMeshbluConfig().uuid
  const properties = {
    name: getFriendlyName(connector),
    type: registryItem.type,
    connector,
    owner,
    discoverWhitelist: [owner],
    configureWhitelist: [owner],
    sendWhitelist: [owner],
    receiveWhitelist: [owner],
    connectorMetadata: {
      stopped: false,
      version,
      githubSlug: registryItem.githubSlug,
    },
    schemas,
    octoblu: {
      registryItem,
    },
  }
  registerConnector({ properties }, (error, device) => {
    if (error != null) return callback(error)
    const { uuid, token } = device
    const defaultValues = getDefaultValues(schemas)
    if (_.isEmpty(defaultValues)) {
      return callback(null, { uuid, token })
    }
    updateDevice({ uuid, properties: defaultValues }, (error) => {
      if (error != null) return callback(error)
      callback(null, { uuid, token })
    })
  })
}

export function upsertConnector({ uuid, registryItem, version, connector, octoblu }, callback) {
  version = `v${version.replace('v', '')}`
  getSchema({ githubSlug: registryItem.githubSlug, version }, (error, schemas) => {
    if (error) return callback(error)
    const generateKey = generateKeyWrapper({ uuid, registryItem, version, connector, octoblu }, callback)
    if (uuid) {
      return updateConnector({ uuid, registryItem, version, connector, schemas }, generateKey)
    }
    return createConnector({ registryItem, version, connector, schemas }, generateKey)
  })
}
