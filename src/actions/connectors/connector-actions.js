import * as actionTypes from '../../constants/action-types';
import {
  createConnector,
  updateAndGenerateKey,
} from '../../helpers/connector-creator';

function connectorGeneratedRequest() {
  return {
    type: actionTypes.CONNECTOR_GENERATED_REQUEST,
  }
}

function connectorGeneratedSuccess({ key, uuid }) {
  return {
    type: actionTypes.CONNECTOR_GENERATED_SUCCESS,
    key,
    uuid,
  }
}

function connectorGeneratedFailure(error) {
  return {
    type: actionTypes.CONNECTOR_GENERATED_FAILURE,
    error,
  }
}

export function createConnectorAction({ connector, pkg }) {
  return (dispatch) => {
    dispatch(connectorGeneratedRequest())
    createConnector({ connector, pkg }, (error, response) => {
      if (error) {
        dispatch(connectorGeneratedFailure(error))
        return
      }
      dispatch(connectorGeneratedSuccess(response))
    })
  }
}

export function generateConnectorAction({ uuid, connector, pkg }) {
  return (dispatch) => {
    dispatch(connectorGeneratedRequest())
    updateAndGenerateKey({ uuid, connector, pkg }, (error, response) => {
      if (error) {
        dispatch(connectorGeneratedFailure(error))
        return
      }
      dispatch(connectorGeneratedSuccess(response))
    })
  }
}
