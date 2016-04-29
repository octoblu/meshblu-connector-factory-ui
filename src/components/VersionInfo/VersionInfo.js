import React, { PropTypes } from 'react';
import _  from 'lodash';

import './VersionInfo.css';

const propTypes = {
  info: PropTypes.object.isRequired,
};

const VersionInfo = ({ info }) => {
  const { version, latest } = info;

  let theVersion = `v${version}`;
  if (latest) return (<span className="VersionInfo"><strong>{theVersion}</strong> [ latest ]</span>);
  return (
    <span className="VersionInfo">
      {theVersion}
    </span>
  );
};

VersionInfo.propTypes = propTypes;

export default VersionInfo;
