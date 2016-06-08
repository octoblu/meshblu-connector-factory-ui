import * as actionTypes from '../../constants/action-types'

const initialState = {
  error: null,
  generating: false,
  key: null,
  uuid: null,
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CONNECTOR_GENERATED_REQUEST:
      return { ...state, generating: true }

    case actionTypes.CONNECTOR_GENERATED_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.CONNECTOR_GENERATED_SUCCESS:
      return { ...state, key: action.key, uuid: action.uuid, generating: false, error: null }

    default:
      return state
  }
}
