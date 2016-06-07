import request from 'superagent';
import * as actionTypes from '../../constants/action-types';
import { createConnector } from '../../helpers/connector-creator';

function createConnectorRequest() {
  return {
    type: actionTypes.CREATE_CONNECTOR_REQUEST
  }
}

function createConnectorSuccess({ key, uuid }) {
  return {
    type: actionTypes.CREATE_CONNECTOR_SUCCESS,
    key,
    uuid
  }
}

function createConnectorFailure(error) {
  return {
    type: actionTypes.CREATE_CONNECTOR_FAILURE,
    error
  }
}

export function createConnectorAction({ connector, pkg }) {
  return (dispatch) => {
    dispatch(createConnectorRequest())
    createConnector({ connector, pkg }, (error, response) => {
      if(error) {
        dispatch(createConnectorFailure(error))
        return
      }
      dispatch(createConnectorSuccess(response))
    })
  }
}
