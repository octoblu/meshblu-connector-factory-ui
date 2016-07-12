import React, { PropTypes } from 'react'
import SelectedVersion from '../SelectedVersion'
import Versions from '../Versions'
import OrLine from '../OrLine'

import './index.css'

const propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.object,
  versions: PropTypes.object,
}

const VersionsSelect = ({ selected, onSelect, versions }) => {
  let selectedVersion = null
  if (selected) {
    selectedVersion = (
      <span>
        <SelectedVersion info={selected} onSelect={onSelect} />
        <OrLine />
      </span>
    )
  }
  return (
    <div className="CenterIt">
      {selectedVersion}
      <Versions versions={versions} onSelect={onSelect} />
    </div>
  )
}

VersionsSelect.propTypes = propTypes

export default VersionsSelect
