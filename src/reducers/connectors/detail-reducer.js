import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'

const initialState = {
  selectedVersion: {
    latest: false,
    version: null,
    details: {},
  },
  info: {
    tags: {},
  },
  latestVersion: {
    latest: true,
    version: null,
    details: {},
  },
  updatedAt: null,
}

function getVersion(version = '') {
  return version.replace('v', '')
}

function filterTags(tags) {
  return _.omitBy(tags, ({ assets }) => {
    return _.some(assets, { name: 'schemas.json' })
  }) || {}
}

function getCurrentVersion({ details, version }) {
  const { latest = {} } = details
  const { tags = {} } = details
  return {
    version: getVersion(version),
    latest: latest.tag === version,
    details: tags[version],
  }
}

function getLastestVersion({ details }) {
  const { latest = {} } = details
  const version = latest.tag
  return {
    version: getVersion(version),
    latest: true,
    details: details.latest,
  }
}

function getVersionsState(action) {
  const { details, version } = action
  details.tags = filterTags(details.tags)
  return {
    info: details,
    latestVersion: getLastestVersion({ details, version }),
    selectedVersion: getCurrentVersion({ details, version }),
  }
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS:
      return { ...state, ...getVersionsState(action), updatedAt: Date.now() }

    case actionTypes.SELECT_VERSION:
      return { ...state, selectedVersion: action.selectedVersion }

    default:
      return state
  }
}
