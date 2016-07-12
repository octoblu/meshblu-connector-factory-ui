import React, { PropTypes } from 'react'

import './index.css'

const propTypes = {
  info: PropTypes.object.isRequired,
}

const VersionInfo = ({ info }) => {
  const { tag, latest } = info
  if (!tag) {
    return null
  }
  const theVersion = `v${tag.replace('v', '')}`
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
