import * as actionTypes from '../../constants/action-types';
import { setFetching, setError } from '../page-actions'
import { clearMyDevicesUpdatedAt } from '../things/device-actions'
import { push } from 'react-router-redux'
import {
  createConnector,
  updateAndGenerateKey,
} from '../../helpers/connector-creator';

export function gotToGeneratedConnector({ key, uuid }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_GENERATED_CONNECTOR,
    })
    dispatch(push(`/connectors/generated/${uuid}/${key}`))
  }
}

function connectorGeneratedSuccess({ key, uuid }) {
  return {
    type: actionTypes.CONNECTOR_GENERATED_SUCCESS,
    key,
    uuid,
  }
}

export function createConnectorAction({ connector, version, githubSlug, octoblu }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    createConnector({ connector, version, githubSlug, octoblu }, (error, response) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(clearMyDevicesUpdatedAt())
      dispatch(connectorGeneratedSuccess(response))
    })
  }
}

export function generateConnectorAction({ uuid, connector, version, githubSlug, octoblu }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    updateAndGenerateKey({ uuid, connector, version, githubSlug, octoblu }, (error, response) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(connectorGeneratedSuccess(response))
    })
  }
}
