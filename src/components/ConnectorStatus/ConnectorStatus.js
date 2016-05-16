import React, { PropTypes } from 'react';

import {
  Button,
} from 'zooid-ui';

import './ConnectorStatus.css';

const propTypes = {
  device: PropTypes.object.isRequired,
};

const getStatusInfo = (device) => {
  const { lastPong, connectorMetadata } = device;
  let stopped = false;
  if(connectorMetadata != null) {
    stopped = connectorMetadata.stopped;
  }

  if (lastPong && !stopped) {
    const { date, response } = lastPong;
    const { running } = response;
    const oneMinAgo = Date.now() - (1000 * 60);
    if(date > oneMinAgo) {
      if(running) {
        return { statusText: 'connector is responding to pings', online: true }
      }
    }
  }
  const { online } = device;
  if (online) {
    return { statusText: 'thing is online', online: true }
  }
  return { statusText: 'thing is offline', online: false }
}

const ConnectorStatus = ({ device }) => {
  if(device == null) {
    return null
  }
  const { statusText, online } = getStatusInfo(device)
  if (online) {
    return <Button kind="hollow-primary">{statusText}</Button>;
  }
  return <Button kind="hollow-danger">{statusText}</Button>;
};


ConnectorStatus.propTypes = propTypes;

export default ConnectorStatus;
