import React, { PropTypes } from 'react';
import { needsUpdate } from '../../helpers/actions';
import './index.css';

const propTypes = {
  device: PropTypes.object.isRequired,
  statusDevice: PropTypes.object.isRequired,
};

const getStatusInfo = ({ statusDevice, device }) => {
  const { lastPong } = statusDevice || {}
  let stopped = false;
  const { connectorMetadata, online } = device || {}
  if (connectorMetadata != null) {
    stopped = connectorMetadata.stopped;
  }
  if (lastPong && !stopped) {
    const { date, response, error } = lastPong;
    const { running } = response;
    if (!needsUpdate({ updatedAt: date }, 60)) {
      if (error != null) {
        return { statusText: 'connector error', online: true }
      }
      if (running) {
        return { statusText: 'connector is running', online: true }
      }
      return { statusText: 'connector is responding to pings', online: true }
    }
  }
  if (online) {
    return { statusText: 'thing is online', online: true }
  }
  return { statusText: 'thing is offline', online: false }
}

const renderContent = (content) => {
  return <span className="ConnectorStatus">{content}</span>
}

const ConnectorStatus = ({ statusDevice, device }) => {
  const { statusText, online } = getStatusInfo({ device, statusDevice })
  if (online) {
    return renderContent(<span className="ConnectorStatus--Online">{statusText}</span>);
  }
  return renderContent(<span className="ConnectorStatus--Offline">{statusText}</span>);
};


ConnectorStatus.propTypes = propTypes;

export default ConnectorStatus;
