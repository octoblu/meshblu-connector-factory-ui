import React, { PropTypes } from 'react'

const propTypes = {
  otp:              PropTypes.string,
  os:               PropTypes.string,
  arch:             PropTypes.string,
}

const ARCH_MAP = {'amd64': 'x64', '386': 'x86', 'arm': 'ARM'}

const OsArchButton = ({os, arch, href}) => {
  const fancyArch = _.get(ARCH_MAP, arch, arch)

  return <a href={href}>{fancyArch}</a>
}

OsArchButton.propTypes    = propTypes

export default OsArchButton
