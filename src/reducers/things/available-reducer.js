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
  let allItems = []
  _.each(_.values(registries), (registry) => {
    let items = _.get(registry, 'items', [])
    if (_.isPlainObject(items)) {
      items = _.values(items)
    }
    allItems = _.union(allItems, items)
  })
  return allItems
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AVAILABLE_CONNECTORS_SUCCESS:
      return { ...state, registries: action.registries, items: flatten(action.registries) }

    default:
      return state
  }
}
