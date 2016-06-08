import * as actionTypes from '../constants/action-types'

const initialState = {
  fetching: false,
  error: null,
  fragments: [],
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAGE_LAYOUT_FETCHING:
      return { ...state, fetching: action.fetching }

    case actionTypes.PAGE_LAYOUT_ERROR:
      return { ...state, error: action.error }

    case actionTypes.PAGE_LAYOUT_BREADCRUMBS:
      return { ...state, fragments: action.fragments }

    default:
      return state
  }
}
