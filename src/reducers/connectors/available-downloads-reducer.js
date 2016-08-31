import * as actionTypes from '../../constants/action-types'

const initialState = {
  availableDownloads: {},
  fetching: false,
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AVAILABLE_DOWNLOADS_FETCHING:
      return { ...initialState, fetching: true }
    case actionTypes.FETCH_AVAILABLE_DOWNLOADS_SUCCESS:
      return { ...initialState, availableDownloads: action.availableDownloads }
    case actionTypes.FETCH_AVAILABLE_DOWNlOADS_FAILURE:
      return { ...initialState, error: action.error }
    default:
      return state
  }
}
