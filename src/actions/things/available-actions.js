import request from 'superagent';
import * as actionTypes from '../../constants/action-types';
import { getMeshbluConfig } from '../../helpers/authentication';
import { OCTOBLU_API_URL } from '../../constants/config'

function fetchAvailableNodesRequest() {
  return {
    type: actionTypes.FETCH_AVAILABLE_NODES_REQUEST,
  }
}

function fetchAvailableNodesSuccess(connectors) {
  return {
    type: actionTypes.FETCH_AVAILABLE_NODES_SUCCESS,
    connectors,
  }
}

function fetchAvailableNodesFailure(error) {
  return {
    type: actionTypes.FETCH_AVAILABLE_NODES_FAILURE,
    error,
  }
}

export function fetchAvailableNodes() {
  return (dispatch) => {
    dispatch(fetchAvailableNodesRequest())
    const { uuid, token } = getMeshbluConfig()
    request
      .get(`${OCTOBLU_API_URL}/api/node_types`)
      .auth(uuid, token)
      .end((error, response) => {
        if (error) return dispatch(fetchAvailableNodesFailure(error))
        if (!response.ok) return dispatch(fetchAvailableNodesFailure(new Error('Unable to retrieve nodes')))
        dispatch(fetchAvailableNodesSuccess(response.body))
      })
  }
}
