import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { OCTOBLU_APP_URL } from '../../constants/config'
import { Button } from 'zooid-ui'
import StopStartButton from '../StopStartButton'
import VersionStatus from '../VersionStatus'

import './index.css'

const DeviceActions = ({ device, selectedVersion, changeState, changeVersion }) => {
  if (!device) return null
  const { connectorMetadata } = device
  const buttons = []

  if (connectorMetadata) {
    const { stopped } = connectorMetadata
    buttons.push(<StopStartButton
      changeState={changeState}
      stopped={stopped}
    />)
  }

  buttons.push(<VersionStatus selectedVersion={selectedVersion} onSelect={changeVersion} />)

  buttons.push(
    <Link
      to={`/connectors/generate/${device.uuid}`}
      className="Button Button--hollow-neutral"
    >
      Generate Installer
    </Link>
  )

  buttons.push(
    <Button
      kind="hollow-primary"
      href={`${OCTOBLU_APP_URL}/device/${device.uuid}`}
    >
      Open in Octoblu
    </Button>
  )

  const buttonElements = _.map(buttons, (button, index) => {
    return <li key={index}>{button}</li>
  })
  return <ul>{buttonElements}</ul>
}

DeviceActions.propTypes = {
  device: PropTypes.object,
  changeState: PropTypes.func.isRequired,
  changeVersion: PropTypes.func.isRequired,
  selectedVersion: PropTypes.object.isRequired,
}

export default DeviceActions
