import * as actionTypes from '../../constants/action-types'

const initialState = {
  error: null,
  fetching: false,
  item: {}
}

export default function types(state=initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DEVICE_REQUEST:
      return { ...initialState, fetching: true }

    case actionTypes.FETCH_DEVICE_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.FETCH_DEVICE_SUCCESS:
      return { ...state, item: action.device, fetching: false, error: null }

    default:
      return state
  }
}
