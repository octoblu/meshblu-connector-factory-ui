import * as actionTypes from '../../constants/action-types'

const initialState = {
  error: null,
  fetching: false,
  selectedVersion: {
    latest: false,
    version: null,
    pkg: {},
  },
  info: {
    versions: {},
  },
}

function getCurrentVersion({ info }) {
  const latestVersion = info['dist-tags'].latest;
  return {
    version: latestVersion,
    latest: true,
    pkg: info.versions[latestVersion],
  }
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONNECTOR_DETAILS_REQUEST:
      return { ...initialState, fetching: true }

    case actionTypes.FETCH_CONNECTOR_DETAILS_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS:
      return { ...state, info: action.info, selectedVersion: getCurrentVersion(action), fetching: false, error: null }

    case actionTypes.SELECT_VERSION:
      return { ...state, selectedVersion: action.selectedVersion }

    default:
      return state
  }
}
