import * as actionTypes from '../../constants/action-types'

const initialState = {
  error: null,
  fetching: false,
  selectedVersion: {
    latest: false,
    version: null,
    pkg: {}
  },
  info: {
    versions: {}
  }
}

export default function types(state=initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONNECTOR_DETAILS_REQUEST:
      return { ...initialState, fetching: true }

    case actionTypes.FETCH_CONNECTOR_DETAILS_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS:
      const { info } = action;
      const latestVersion = info['dist-tags'].latest;
      const selectedVersion = {
        version: latestVersion,
        latest: true,
        pkg: info.versions[latestVersion]
      }
      return { ...state, info, selectedVersion: selectedVersion, fetching: false, error: null }

    case actionTypes.SELECT_VERSION:
      return { ...state, selectedVersion: action.selectedVersion }

    default:
      return state
  }
}
