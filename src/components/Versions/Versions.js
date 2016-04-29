import React, { PropTypes } from 'react';
import _  from 'lodash';
import VersionInfo from '../VersionInfo';

import {
  List,
  ListItem,
} from 'zooid-ui';

import MdNavigateNext from 'react-icons/lib/md/navigate-next';

import './Versions.css';

const propTypes = {
  versions: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

function majorAndMinorList(versions) {
  let majorMinors = {};
  _.each(versions, (version) => {
    const [major, minor] = version.split('.');
    majorMinors[`${major}.${minor}`] = false;
  });
  return majorMinors;
}

function filterAndSortVersions(_versions) {
  const sortedAndReversed = _.reverse(_.keys(_versions));
  let majorMinors = majorAndMinorList(sortedAndReversed);
  _.each(sortedAndReversed, (version) => {
    const [major, minor] = version.split('.');
    if(majorMinors[`${major}.${minor}`]) return;
    majorMinors[`${major}.${minor}`] = version;
  });
  return _.values(majorMinors);
}

const Versions = ({ versions, select }) => {
  const versionKeys = filterAndSortVersions(versions);

  const versionsList = _.map(versionKeys, (version, i) => {
    const pkg = versions[version];
    const latest = !i;
    const versionInfo = { version, pkg, latest };
    const selectEvent = () => {
      select(versionInfo);
    };
    return (
      <ListItem key={version}>
        <div onClick={selectEvent}>
          <VersionInfo info={versionInfo} />
          <i className="Versions--icon" role="icon"><MdNavigateNext /></i>
        </div>
      </ListItem>
    );
  });
  return (
    <div className="Versions">
      <h4>Select Version:</h4>
      <List>
        {versionsList}
      </List>
    </div>
  );
};

Versions.propTypes = propTypes;

export default Versions;