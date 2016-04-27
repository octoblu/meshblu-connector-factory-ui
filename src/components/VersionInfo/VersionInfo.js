import React, { PropTypes } from 'react';
import styles from './VersionInfo.css';
import _  from 'lodash';

const propTypes = {
  info: PropTypes.object.isRequired
};

const VersionInfo = ({ info }) => {
  const { version, pkg, latest } = info;

  let title = `v${version}`;
  if(latest) title = `${title} (latest)`;
  return (
    <div>
      {title}
    </div>
  );
};

export default VersionInfo;
