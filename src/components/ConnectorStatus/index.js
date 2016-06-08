import React, { PropTypes } from 'react';

import {
  Button,
} from 'zooid-ui';

import './index.css';

const propTypes = {
  device: PropTypes.object.isRequired,
  connectorMetadata: PropTypes.object,
};

const getStatusInfo = ({ device, connectorMetadata }) => {
  const { lastPong } = device;
  let stopped = false;
  if (connectorMetadata != null) {
    stopped = connectorMetadata.stopped;
  }

  if (lastPong && !stopped) {
    const { date, response, error } = lastPong;
    const { running } = response;
    const oneMinAgo = Date.now() - (1000 * 60);
    if (date > oneMinAgo) {
      if (error != null) {
        return { statusText: 'connector error', online: true }
      }
      if (running) {
        return { statusText: 'connector is running', online: true }
      }
      return { statusText: 'connector is responding to pings', online: true }
    }
  }
  const { online } = device;
  if (online) {
    return { statusText: 'thing is online', online: true }
  }
  return { statusText: 'thing is offline', online: false }
}

const ConnectorStatus = ({ device, connectorMetadata }) => {
  if (device == null) {
    return null
  }
  const { statusText, online } = getStatusInfo({ device, connectorMetadata })
  if (online) {
    return <Button kind="hollow-primary">{statusText}</Button>;
  }
  return <Button kind="hollow-danger">{statusText}</Button>;
};


ConnectorStatus.propTypes = propTypes;

export default ConnectorStatus;
