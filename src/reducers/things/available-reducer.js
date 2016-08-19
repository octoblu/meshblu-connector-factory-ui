import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'

const initialState = {
  registries: {
    'octoblu-official': {},
    'octoblu-community': {},
  },
  items: [],
}

function flatten(registries) {
  return _.flatten(_.map(_.values(registries), 'items'))
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AVAILABLE_CONNECTORS_SUCCESS:
      return { ...state, registries: action.registries, items: flatten(action.registries) }

    default:
      return state
  }
}
