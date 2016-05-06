import './InstalledDevices.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Card,
  DeviceIcon,
} from 'zooid-ui';

import classNames from 'classnames';

const InstalledDevices = ({ devices, children, className }) => {
  const componentClass = classNames(
    'InstalledDevices',
    className
  );

  let items = _.map(devices, (device) => {
    const { name, uuid } = device;
    let type = device.type || 'device:other';

    return <Card key={device.uuid} className="InstalledDevice">
      <aside><DeviceIcon type={type} className="InstalledDevice-icon" /></aside>
      <main className="InstalledDevice-main">
        <div className="InstalledDevice-body">
          <h3 className="InstalledDevice-name">{name} <small className="InstalledDevice-status">TODO</small></h3>
        </div>
        <footer className="InstalledDevice-footer">
          <Link to={`/things/configure/${uuid}`} className="InstalledDevice-button">Configure Thing</Link>
        </footer>
      </main>
    </Card>
  })

  return <div className={componentClass}>
    {items}
  </div>
};

InstalledDevices.propTypes = {
  className: PropTypes.string,
  devices: PropTypes.array.isRequired
}

export default InstalledDevices
