import React, { PropTypes } from 'react';
import _  from 'lodash';
import SelectedVersion from '../SelectedVersion';
import Versions from '../Versions';

import './VersionsSelect.css';

const propTypes = {
  onSelect: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.object,
  versions: PropTypes.object.isRequired,
};


const VersionsSelect = ({ type, selected, onSelect, versions }) => {
  let selectedVersion = null;
  if(selected) {
    selectedVersion = (
      <span>
        <SelectedVersion info={selected} onSelect={onSelect} type={type} />
        <h3>-- OR --</h3>
      </span>
    )
  }
  return (
    <div className="CenterIt">
      {selectedVersion}
      <Versions versions={versions} onSelect={onSelect} />
    </div>
  );
};

VersionsSelect.propTypes = propTypes;

export default VersionsSelect;
