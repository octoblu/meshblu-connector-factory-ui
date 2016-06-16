import * as actionTypes from '../../constants/action-types'

const initialState = {
  selectedVersion: {
    latest: false,
    version: null,
    pkg: {},
  },
  info: {
    versions: {},
  },
  latestVersion: {
    latest: true,
    version: null,
    pkg: {},
  },
  updatedAt: null,
}

function getCurrentVersion({ details, version }) {
  return {
    version,
    latest: details['dist-tags'].latest === version,
    pkg: details.versions[version],
  }
}

function getLastestVersion({ details }) {
  const version = details['dist-tags'].latest
  return {
    version,
    latest: true,
    pkg: details.versions[version],
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
