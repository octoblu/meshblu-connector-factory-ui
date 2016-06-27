import * as actionTypes from '../../constants/action-types'

const initialState = {
  key: null,
  uuid: null,
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CONNECTOR_GENERATED_SUCCESS:
      return { ...state, key: action.key, uuid: action.uuid }

    case actionTypes.CLEAR_GENERATED_CONNECTOR:
      return initialState

    default:
      return state
  }
}
