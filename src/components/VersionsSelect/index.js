import _ from 'lodash'
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

function getSelected({ selected, onSelect }) {
  if (!selected) return null
  return <SelectedVersion info={selected} onSelect={onSelect} />
}

const VersionsSelect = ({ selected, onSelect, versions }) => {
  const versionsList = <Versions versions={versions} onSelect={onSelect} />
  const selectedVersion = getSelected({ selected, onSelect })

  if (_.isEmpty(versions)) {
    return (
      <div className="CenterIt">
        {selectedVersion}
      </div>
    )
  }

  return (
    <div className="CenterIt">
      <span>
        {selectedVersion}
        <OrLine />
      </span>
      {versionsList}
    </div>
  )
}

VersionsSelect.propTypes = propTypes

export default VersionsSelect
