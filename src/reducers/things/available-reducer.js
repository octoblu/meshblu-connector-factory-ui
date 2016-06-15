import * as actionTypes from '../../constants/action-types'
import latestConnectors from '../../assets/latest-connectors';
import _ from 'lodash'

const initialState = {
  legacy: [],
  latest: [],
  updatedAt: null,
}

function getConnectors({ connectors }) {
  return _.filter(connectors, (connector = {}) => {
    if (!connector.connector) return false
    if (connector.category !== 'device') return false
    return true
  })
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AVAILABLE_NODES_SUCCESS:
      return { ...state, updatedAt: Date.now(), legacy: getConnectors(action), latest: latestConnectors }

    default:
      return state
  }
}
