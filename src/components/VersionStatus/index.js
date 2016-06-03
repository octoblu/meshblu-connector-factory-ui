import React, { PropTypes } from 'react';

import {
  Button,
} from 'zooid-ui';

import './index.css';

const propTypes = {
  onSelect: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
};

const VersionStatus = ({ onSelect, version }) => {
  if(version == null) {
    return null
  }
  return <Button kind="hollow-neutral" onClick={onSelect}>v{version}</Button>;
};


VersionStatus.propTypes = propTypes;

export default VersionStatus;
