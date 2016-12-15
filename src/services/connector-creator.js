import _ from 'lodash'
import request from 'superagent'
import { getMeshbluConfig } from '../helpers/authentication'
import { getFriendlyName, getConnectorMetadata } from '../helpers/connector-metadata'

import { CONNECTOR_SERVICE_URI } from '../constants/config'

import {
  generateAndStoreToken,
  getDevice,
} from '../services/device-service'

import { generateOtp } from '../services/otp-service'

function generateKeyWrapper({ registryItem, connector, version, octoblu }, callback) {
  return (error, device) => {
    if (error) return callback(error)
    const { uuid } = device
    const meshblu = _.get(device, 'connectorMetadata.meshblu')
    generateAndStoreToken({ uuid }, (error, { token } = {}) => {
      if (error != null) return callback(error)
      const { githubSlug } = registryItem
      const options = {
        connector,
        githubSlug,
        version,
        octoblu,
        meshblu,
      }
      getConnectorMetadata(options, (error, metadata) => {
        if (error != null) return callback(error)
        generateOtp({ uuid, token, metadata }, (error, response) => {
          if (error != null) return callback(error)
          const { key } = response || {}
          return callback(null, { key, uuid })
        })
      })
    })
  }
}

function updateConnector({ uuid, properties }, callback) {
  request
    .put(`${CONNECTOR_SERVICE_URI}/users/${getMeshbluConfig().uuid}/connectors/${uuid}`)
    .send(properties)
    .auth(getMeshbluConfig().uuid, getMeshbluConfig().token)
    .accept('application/json')
    .set('Content-Type', 'application/json')
    .end((error, response) => {
      if (error) {
        callback(error)
        return
      }
      if (!response.ok) {
        callback(new Error(_.get(response, 'body.error', 'Unable to update the connector')))
        return
      }
      getDevice({ uuid }, callback)
    })
}

function createConnector({ properties }, callback) {
  request
    .post(`${CONNECTOR_SERVICE_URI}/users/${getMeshbluConfig().uuid}/connectors`)
    .send(properties)
    .auth(getMeshbluConfig().uuid, getMeshbluConfig().token)
    .accept('application/json')
    .set('Content-Type', 'application/json')
    .end((error, response) => {
      if (error) {
        callback(error)
        return
      }
      if (!response.ok) {
        callback(new Error(_.get(response, 'body.error', 'Unable to update the connector')))
        return
      }
      callback(null, response.body)
    })
}

export function upsertConnector({ uuid, registryItem, version, connector, octoblu }, callback) {
  version = `v${version.replace('v', '')}`
  const generateKey = generateKeyWrapper({ uuid, registryItem, version, connector, octoblu }, callback)
  const properties = {
    type: registryItem.type,
    connector,
    owner: getMeshbluConfig().uuid,
    githubSlug: registryItem.githubSlug,
    registryItem,
    version,
  }
  if (uuid) {
    return updateConnector({ uuid, properties }, generateKey)
  }
  _.set(properties, 'name', getFriendlyName(connector))
  return createConnector({ properties }, generateKey)
}
