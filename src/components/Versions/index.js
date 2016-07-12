import React, { PropTypes } from 'react'
import _  from 'lodash'
import VersionInfo from '../VersionInfo'

import {
  List,
  ListItem,
} from 'zooid-ui'

import MdNavigateNext from 'react-icons/lib/md/navigate-next'

import './index.css'

const propTypes = {
  versions: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function majorAndMinorList(versions) {
  const majorMinors = {}
  _.each(versions, (info, version) => {
    const [major, minor] = version.split('.')
    majorMinors[`${major}.${minor}`] = false
  })
  return majorMinors
}

function filterAndSortVersions(versions) {
  const majorMinors = majorAndMinorList(versions)
  _.each(versions, (info, version) => {
    const [major, minor] = version.split('.')
    if (majorMinors[`${major}.${minor}`]) return
    majorMinors[`${major}.${minor}`] = info
  })
  return _.values(majorMinors)
}

const Versions = ({ versions, onSelect }) => {
  const convertedVersions = filterAndSortVersions(versions)

  const versionsList = _.map(convertedVersions, (version, i) => {
    const onSelectEvent = () => {
      onSelect(version)
    }
    return (
      <ListItem key={version.tag}>
        <div onClick={onSelectEvent}>
          <VersionInfo info={version} />
          <i className="Versions--icon"><MdNavigateNext /></i>
        </div>
      </ListItem>
    )
  })
  if (_.isEmpty(versionsList)) {
    return null
  }
  return (
    <div className="Versions">
      <h2>Select Version:</h2>
      <List>
        {versionsList}
      </List>
    </div>
  )
}

Versions.propTypes = propTypes

export default Versions
