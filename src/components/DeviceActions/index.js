import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import StopStartButton from '../StopStartButton';
import ConnectorStatus from '../ConnectorStatus';
import VersionStatus from '../VersionStatus';

import './index.css';

const DeviceActions = ({ device, changeState, changeVersion, statusDevice }) => {
  if (!device) return null
  const { connectorMetadata } = device;
  const buttons = [];

  buttons.push(<ConnectorStatus device={statusDevice} connectorMetadata={device.connectorMetadata} />)

  if (connectorMetadata) {
    const { stopped, version } = connectorMetadata;
    buttons.push(<StopStartButton
      changeState={changeState}
      stopped={stopped}
    />)
    buttons.push(<VersionStatus version={version} onSelect={changeVersion} />)
  }

  buttons.push(
    <Link
      to={`/connectors/generate/${device.uuid}`}
      className="Button Button--hollow-primary"
    >
      Generate Update Installer
    </Link>
  );

  const buttonElements = _.map(buttons, (button, index) => {
    return <li key={index}>{button}</li>
  })
  return <ul>{buttonElements}</ul>
};

DeviceActions.propTypes = {
  device: PropTypes.object,
  statusDevice: PropTypes.object,
  changeState: PropTypes.func.isRequired,
  changeVersion: PropTypes.func.isRequired,
}

export default DeviceActions
