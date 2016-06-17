import * as actionTypes from '../constants/action-types'

const initialState = {
  fetchingCount: 0,
  error: null,
  fragments: [],
}

function getFetchingCount({ fetchingCount }, { fetching }) {
  if (fetching) {
    return fetchingCount + 1
  }
  return fetchingCount - 1
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAGE_LAYOUT_RESET:
      return { ...state, fetchingCount: 0, error: null }

    case actionTypes.PAGE_LAYOUT_FETCHING:
      return { ...state, fetchingCount: getFetchingCount(state, action) }

    case actionTypes.PAGE_LAYOUT_ERROR:
      return { ...state, error: action.error }

    case actionTypes.PAGE_LAYOUT_BREADCRUMBS:
      return { ...state, fragments: action.fragments }

    default:
      return state
  }
}
