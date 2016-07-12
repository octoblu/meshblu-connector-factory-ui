import React, { PropTypes } from 'react'

import './index.css'

const propTypes = {
  info: PropTypes.object.isRequired,
}

const VersionInfo = ({ info }) => {
  const { version, latest } = info
  if (!version) {
    return null
  }
  const tag = version.replace('v', '')
  const theVersion = `v${tag}`
  if (latest) {
    return (
      <span className="VersionInfo">
        <strong>{theVersion}</strong>
        <span className="VersionInfo--latest">[ latest ]</span>
      </span>
    )
  }
  return (
    <span className="VersionInfo">
      {theVersion}
    </span>
  )
}

VersionInfo.propTypes = propTypes

export default VersionInfo
