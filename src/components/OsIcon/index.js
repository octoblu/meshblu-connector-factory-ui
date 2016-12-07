import _ from 'lodash'
import React, { PropTypes } from 'react'

import FaApple   from 'react-icons/lib/fa/apple'
import FaWindows from 'react-icons/lib/fa/windows'
import FaLinux   from 'react-icons/lib/fa/linux'

const propTypes = {
  os: PropTypes.string,
}

const OS_ICON_MAP = { darwin: FaApple, linux: FaLinux, windows: FaWindows }

const OsIcon = ({ os }) => {
  const Icon = _.get(OS_ICON_MAP, os)
  return <Icon />
}

OsIcon.propTypes    = propTypes

export default OsIcon
