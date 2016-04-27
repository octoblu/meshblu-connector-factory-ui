import React, { PropTypes } from 'react';
import styles from './Versions.css';
import _  from 'lodash';
import VersionInfo from '../VersionInfo';

const propTypes = {
  versions: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

const Versions = ({ versions, select }) => {
  const versionKeys = _.reverse(_.keys(versions));
  const versionsList = _.map(versionKeys, (version, i) => {
    const pkg = versions[version];
    const latest = !i;
    const versionInfo = { version, pkg, latest };
    const selectEvent = () => {
      select(versionInfo);
    };
    return (
      <li key={version} onClick={selectEvent}>
        <VersionInfo info={versionInfo} />
      </li>
    );
  });
  return (
    <div className={styles.root}>
      <h1>Versions</h1>
      <ul>
        {versionsList}
      </ul>
    </div>
  );
};

Versions.propTypes = propTypes;

export default Versions;
