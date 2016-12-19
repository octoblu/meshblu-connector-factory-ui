import React, { PropTypes } from 'react'
import './index.css'

import ConnectorStatus from '../ConnectorStatus'
import ConnectorMetadata from '../ConnectorMetadata'

const propTypes = {
  statusDevice: PropTypes.object,
  device: PropTypes.object,
}

const DeviceInfoBar = ({ statusDevice, device }) => {
  return (
    <div className="DeviceInfoBars">
      <div className="DeviceInfoBar">
        <ConnectorMetadata device={device} />
      </div>
      <div className="DeviceInfoBar">
        <ConnectorStatus device={device} statusDevice={statusDevice} />
      </div>
    </div>
  )
}

DeviceInfoBar.propTypes = propTypes

export default DeviceInfoBar
