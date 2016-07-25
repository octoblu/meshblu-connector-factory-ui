import React, { PropTypes } from 'react'
import Button from 'zooid-button'

const propTypes = {
  uuid: PropTypes.string.isRequired,
}

const DownloadingInfo = ({uuid}) => {
  return <div>
    <p>Your download will begin shortly. Once the
       download has completed, run through the install process. Then click next to configure the device</p>
     <Button kind="primary" href={`/connectors/configure/${uuid}`}>Next: Configure</Button>
  </div>
}

DownloadingInfo.propTypes = propTypes

export default DownloadingInfo
