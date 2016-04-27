import React, { PropTypes } from 'react';
import styles from './VersionInfo.css';

const propTypes = {
  info: PropTypes.object.isRequired,
};

const VersionInfo = ({ info }) => {
  const { version, latest } = info;

  let title = `v${version}`;
  if (latest) title = `${title} (latest)`;
  return (
    <div className={styles.root}>
      {title}
    </div>
  );
};

VersionInfo.propTypes = propTypes;

export default VersionInfo;
