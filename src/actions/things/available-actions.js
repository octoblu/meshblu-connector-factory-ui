import _ from 'lodash'
import async from 'async'
import { getJSON } from '../../services/fetch-json-service'
import * as actionTypes from '../../constants/action-types'
import { OCTOBLU_OFFICIAL_REGISTRY } from '../../constants/config'
import { setFetching, setError } from '../page-actions'

function fetchAvailableConnectorsResult(registries) {
  return {
    type: actionTypes.FETCH_AVAILABLE_CONNECTORS_SUCCESS,
    registries,
  }
}

export function fetchAvailableConnectors({ user }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    const registries = _.get(user, 'octoblu.registries.connectors') || {}
    registries['octoblu-official'] = {
      uri: OCTOBLU_OFFICIAL_REGISTRY,
    }
    async.map(registries, getJSON, (error, registries) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(fetchAvailableConnectorsResult(registries))
    })
  }
}
