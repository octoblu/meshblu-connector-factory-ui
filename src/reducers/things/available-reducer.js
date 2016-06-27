import * as actionTypes from '../../constants/action-types'

const initialState = {
  registries: {
    'octoblu-official': {},
  },
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AVAILABLE_CONNECTORS_SUCCESS:
      return { ...state, registries: action.registries }

    default:
      return state
  }
}
