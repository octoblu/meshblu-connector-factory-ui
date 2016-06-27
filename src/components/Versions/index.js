import React, { PropTypes } from 'react';
import _  from 'lodash';
import VersionInfo from '../VersionInfo';

import {
  List,
  ListItem,
} from 'zooid-ui';

import MdNavigateNext from 'react-icons/lib/md/navigate-next';

import './index.css';

const propTypes = {
  versions: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function majorAndMinorList(versions) {
  const majorMinors = {};
  _.each(versions, (version) => {
    const [major, minor] = version.split('.');
    majorMinors[`${major}.${minor}`] = false;
  });
  return majorMinors;
}

function filterAndSortVersions(_versions) {
  const sortedAndReversed = _.keys(_versions);
  const majorMinors = majorAndMinorList(sortedAndReversed);
  _.each(sortedAndReversed, (version) => {
    const [major, minor] = version.split('.');
    if (majorMinors[`${major}.${minor}`]) return;
    majorMinors[`${major}.${minor}`] = version;
  });
  return _.values(majorMinors);
}

const Versions = ({ versions, onSelect }) => {
  const versionKeys = filterAndSortVersions(versions);

  const versionsList = _.map(versionKeys, (version, i) => {
    const details = versions[version];
    const latest = !i;
    const versionInfo = { version, details, latest };
    const onSelectEvent = () => {
      onSelect(versionInfo);
    };
    return (
      <ListItem key={version}>
        <div onClick={onSelectEvent}>
          <VersionInfo info={versionInfo} />
          <i className="Versions--icon"><MdNavigateNext /></i>
        </div>
      </ListItem>
    );
  });
  return (
    <div className="Versions">
      <h2>Select Version:</h2>
      <List>
        {versionsList}
      </List>
    </div>
  );
};

Versions.propTypes = propTypes;

export default Versions;
