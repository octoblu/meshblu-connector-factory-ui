import * as actionTypes from '../../constants/action-types'
import latestConnectors from '../../assets/latest-connectors';
import _ from 'lodash'

const initialState = {
  error: null,
  fetching: false,
  legacy: [],
  latest: [],
}

export default function types(state=initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AVAILABLE_NODES_REQUEST:
      return { ...state, fetching: true }

    case actionTypes.FETCH_AVAILABLE_NODES_FAILURE:
      return { ...state, error: action.error, fetching: false, legacy: [], latest: [] }

    case actionTypes.FETCH_AVAILABLE_NODES_SUCCESS:
      const connectors = _.filter(action.connectors, (connector={}) => {
        if(!connector.connector) return false
        if(connector.category != 'device') return false
        return true
      })
      return { ...state, legacy: connectors, latest: latestConnectors, fetching: false, error: null }

    default:
      return state
  }
}
