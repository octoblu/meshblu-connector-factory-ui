import React, { PropTypes } from 'react';

import {
  Button,
} from 'zooid-ui';

import './VersionStatus.css';

const propTypes = {
  version: PropTypes.string.isRequired,
};

const VersionStatus = ({ version }) => {
  if(version == null) {
    return null
  }
  return <Button kind="hollow-neutral">{version}</Button>;
};


VersionStatus.propTypes = propTypes;

export default VersionStatus;
