import _ from 'lodash'
import React, { PropTypes } from 'react';

import './index.css';
import CardItem from '../CardItem';
import classNames from 'classnames';

const InstalledDevices = ({ devices, className }) => {
  const componentClass = classNames(
    'InstalledDevices',
    'CardItemList',
    className
  );

  let items = _.map(devices, (device) => {
    const { name, uuid } = device;
    let type = device.type || 'device:other';

    const nameStr = name || 'Unknown Name';
    return (
      <CardItem
        key={uuid}
        title={nameStr}
        iconType={type}
        linkTo={`/things/configure/${uuid}`}
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
}

export default InstalledDevices
