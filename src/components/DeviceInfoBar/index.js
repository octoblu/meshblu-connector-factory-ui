import React, { PropTypes } from 'react'
import './index.css'

import ConnectorStatus from '../ConnectorStatus'

const propTypes = {
  statusDevice: PropTypes.object,
  device: PropTypes.object,
}

const DeviceInfoBar = ({ statusDevice, device }) => {
  return (
    <div className="DeviceInfoBar">
      <ConnectorStatus device={device} statusDevice={statusDevice} />
    </div>
  )
}

DeviceInfoBar.propTypes = propTypes

export default DeviceInfoBar
