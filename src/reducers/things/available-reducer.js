import * as actionTypes from '../../constants/action-types'

const initialState = {
  latest: [],
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AVAILABLE_NODES_SUCCESS:
      return { ...state, latest: action.latest }

    default:
      return state
  }
}
