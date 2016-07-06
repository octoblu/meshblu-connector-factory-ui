import _ from 'lodash'
import React, { PropTypes } from 'react';

import './index.css';
import CardItem from '../CardItem';
import classNames from 'classnames';

const InstalledDevices = ({ devices, type, className }) => {
  const componentClass = classNames(
    'InstalledDevices',
    'CardItemList',
    className
  );

  let devicesList = devices
  if (type && type === 'short') {
    devicesList = _.slice(devices, 0, 6)
  }
  let items = _.map(devicesList, (device) => {
    const { name, uuid } = device;
    let type = device.type || 'device:other';

    const nameStr = name || 'Unknown Name';
    return (
      <CardItem
        key={uuid}
        title={nameStr}
        iconType={type}
        linkTo={`/connectors/configure/${uuid}`}
        linkTitle="Configure"
      />
    )
  })

  return (<div className={componentClass}>
    {items}
  </div>)
};

InstalledDevices.propTypes = {
  className: PropTypes.string,
  devices: PropTypes.array.isRequired,
  type: PropTypes.string,
}

export default InstalledDevices
