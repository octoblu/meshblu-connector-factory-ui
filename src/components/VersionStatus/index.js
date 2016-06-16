import React, { PropTypes } from 'react';

import {
  Button,
} from 'zooid-ui';

import './index.css';

const propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedVersion: PropTypes.object.isRequired,
};

const VersionStatus = ({ onSelect, selectedVersion }) => {
  const { version, latest } = selectedVersion
  if (version == null || latest) {
    return null
  }
  return <Button kind="hollow-primary" onClick={onSelect}>Update Available!</Button>;
};


VersionStatus.propTypes = propTypes;

export default VersionStatus;
