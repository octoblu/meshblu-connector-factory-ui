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

function getCurrentVersion({ details, version }) {
  return {
    version: getVersion(version),
    latest: details.latest.tag === version,
    details: details.tags[version],
  }
}

function getLastestVersion({ details }) {
  const version = details.latest.tag
  return {
    version: getVersion(version),
    latest: true,
    details: details.latest,
  }
}

function getVersionsState(action) {
  return {
    info: action.details,
    latestVersion: getLastestVersion(action),
    selectedVersion: getCurrentVersion(action),
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
