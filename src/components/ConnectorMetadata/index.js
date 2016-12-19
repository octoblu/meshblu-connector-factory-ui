import _ from 'lodash'
import React, { PropTypes } from 'react'
import './index.css'

const propTypes = {
  device: PropTypes.object.isRequired,
}

const getInfoItem = ({ key, title, value }) => {
  return (
    <li key={key}>
      <span className="ConnectorMetadata--title">{title}</span>:
      <span className="ConnectorMetadata--value">{value}</span>
    </li>
  )
}

const resolveVersion = (version) => {
  if (!version) return null
  if (_.startsWith(version, 'v')) return version
  return `v${version}`
}

const renderContent = (content) => {
  return <div className="ConnectorMetadata">{content}</div>
}

const ConnectorMetadata = ({ device }) => {
  if (_.isEmpty(device)) return null
  const currentVersion = resolveVersion(_.get(device, 'connectorMetadata.currentVersion'))
  const desiredVersion = resolveVersion(_.get(device, 'connectorMetadata.version'))
  const infoItems = []
  if (!currentVersion || desiredVersion === currentVersion) {
    infoItems.push(getInfoItem({ key: 1, title: 'Running Version', value: desiredVersion }))
  } else {
    if (desiredVersion) {
      infoItems.push(getInfoItem({ key: 1, title: 'Desired Version', value: desiredVersion }))
    }
    if (currentVersion) {
      infoItems.push(getInfoItem({ key: 2, title: 'Current Version', value: currentVersion }))
    }
  }
  return renderContent(<span className="ConnectorMetadata--info"><ul>{infoItems}</ul></span>)
}

ConnectorMetadata.propTypes = propTypes

export default ConnectorMetadata
