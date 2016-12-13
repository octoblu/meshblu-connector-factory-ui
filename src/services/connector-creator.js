import _ from 'lodash'
import request from 'superagent'
import { getMeshbluConfig } from '../helpers/authentication'
import { getFriendlyName, getConnectorMetadata } from '../helpers/connector-metadata'

import { CONNECTOR_SERVICE_URI } from '../constants/config'

import {
  generateAndStoreToken,
} from '../services/device-service'

import { generateOtp } from '../services/otp-service'

function generateKeyWrapper({ registryItem, connector, version, octoblu }, callback) {
  return (error, uuid) => {
    if (error) return callback(error)
    generateAndStoreToken({ uuid }, (error, { token } = {}) => {
      if (error != null) return callback(error)
      getConnectorMetadata({ connector, githubSlug: registryItem.githubSlug, version, octoblu }, (error, metadata) => {
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
    .put(`${CONNECTOR_SERVICE_URI}/upgrade/${uuid}`)
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
        callback(new Error(_.get(response, 'body', 'Unable to update the connector')))
        return
      }
      callback(null, uuid)
    })
}

function createConnector({ properties }, callback) {
  request
    .post(`${CONNECTOR_SERVICE_URI}/create`)
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
        callback(new Error(_.get(response, 'body', 'Unable to update the connector')))
        return
      }
      const uuid = _.get(response, 'body.uuid')
      callback(null, uuid)
    })
}

export function upsertConnector({ uuid, registryItem, version, connector, octoblu }, callback) {
  version = `v${version.replace('v', '')}`
  const generateKey = generateKeyWrapper({ uuid, registryItem, version, connector, octoblu }, callback)
  const properties = {
    name: getFriendlyName(connector),
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
  return createConnector({ properties }, generateKey)
}
