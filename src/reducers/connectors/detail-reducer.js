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
}

function getCurrentVersion({ details, version }) {
  return {
    version,
    latest: details['dist-tags'].latest === version,
    pkg: details.versions[version],
  }
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS:
      return { ...state, info: action.details, selectedVersion: getCurrentVersion(action) }

    case actionTypes.SELECT_VERSION:
      return { ...state, selectedVersion: action.selectedVersion }

    default:
      return state
  }
}
