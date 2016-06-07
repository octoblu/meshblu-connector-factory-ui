import * as actionTypes from '../../constants/action-types'

const initialState = {
  error: null,
  creating: false,
  key: null,
  uuid: null
}

export default function types(state=initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_CONNECTOR_REQUEST:
      return { ...state, creating: true }

    case actionTypes.CREATE_CONNECTOR_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.CREATE_CONNECTOR_SUCCESS:
      return { ...state, key: action.key, uuid: action.uuid, creating: false, error: null }

    default:
      return state
  }
}
