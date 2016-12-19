import _ from 'lodash'
import React, { PropTypes } from 'react'
import { needsUpdate } from '../../helpers/actions'
import './index.css'

const propTypes = {
  device: PropTypes.object.isRequired,
  statusDevice: PropTypes.object.isRequired,
}

const getErrorMessage = (error) => {
  if (_.isString(error)) {
    return error
  }
  const message = _.get(error, 'message')
  if (message) {
    return message
  }
  const code = _.get(error, 'code')
  if (code) {
    return code
  }
  return null
}

const getStatusInfo = ({ statusDevice = {}, device = {} }) => {
  const lastPong = _.get(statusDevice, 'lastPong')
  const stopped = _.get(device, 'connectorMetadata.stopped', false)
  if (lastPong && !stopped) {
    const running = _.get(statusDevice, 'lastPong.response.running', false)
    const error = _.get(statusDevice, 'lastPong.response.error')
    const date = _.get(statusDevice, 'lastPong.date', new Date())
    if (!needsUpdate({ updatedAt: date }, 60)) {
      if (error != null) {
        const msg = getErrorMessage(error)
        if (msg) {
          return { statusText: `connector responded with the error: "${msg}"`, className: 'ConnectorStatus--Errored' }
        }
        return { statusText: 'connector responded with an error', className: 'ConnectorStatus--Errored' }
      }
      if (running) {
        return { statusText: 'connector is running', className: 'ConnectorStatus--Running' }
      }
      return { statusText: 'connector is online', className: 'ConnectorStatus--Online' }
    }
  }
  return { statusText: 'connector is offline', className: 'ConnectorStatus--Offline' }
}

const renderContent = (content) => {
  return <span className="ConnectorStatus">{content}</span>
}

const ConnectorStatus = ({ statusDevice, device }) => {
  if (statusDevice == null || device == null) {
    return null
  }
  const { statusText, className } = getStatusInfo({ device, statusDevice })
  return renderContent(<span className={className}>{statusText}</span>)
}


ConnectorStatus.propTypes = propTypes

export default ConnectorStatus
