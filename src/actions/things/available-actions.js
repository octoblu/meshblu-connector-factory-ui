import request from 'superagent';
import * as actionTypes from '../../constants/action-types';
import { getMeshbluConfig } from '../../helpers/authentication';
import { OCTOBLU_API_URL } from '../../constants/config'
import { setFetching, setError } from '../page-actions'

function fetchAvailableNodesSuccess(connectors) {
  return {
    type: actionTypes.FETCH_AVAILABLE_NODES_SUCCESS,
    connectors,
  }
}

function clearAvailableUpdatedAtResult() {
  return {
    type: actionTypes.CLEAR_AVAILABLE_NODES,
  }
}

export function clearAvailableUpdatedAt() {
  return (dispatch) => {
    dispatch(clearAvailableUpdatedAtResult())
  }
}

export function fetchAvailableNodes() {
  return (dispatch) => {
    dispatch(setFetching(true))
    const { uuid, token } = getMeshbluConfig()
    request
      .get(`${OCTOBLU_API_URL}/api/node_types`)
      .auth(uuid, token)
      .end((error, response) => {
        dispatch(setFetching(false))
        if (error) return dispatch(setError(error))
        if (!response.ok) return dispatch(setError(new Error('Unable to retrieve nodes')))
        dispatch(fetchAvailableNodesSuccess(response.body))
      })
  }
}
