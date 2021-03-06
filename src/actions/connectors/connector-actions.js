import * as actionTypes from '../../constants/action-types'
import { setFetching, setError } from '../page-actions'
import { clearMyDevicesUpdatedAt } from '../things/device-actions'
import { push } from 'react-router-redux'
import { upsertConnector } from '../../services/connector-creator'

function connectorGeneratedSuccess({ key, uuid }) {
  return {
    type: actionTypes.CONNECTOR_GENERATED_SUCCESS,
    key,
    uuid,
  }
}

export function upsertConnectorAction({ uuid, registryItem, version, connector, octoblu }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    upsertConnector({ uuid, registryItem, version, connector, octoblu }, (error, response) => {
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(clearMyDevicesUpdatedAt())
      dispatch(connectorGeneratedSuccess(response))
      dispatch(setFetching(false))
    })
  }
}

export function gotToGeneratedConnector({ key, uuid }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_GENERATED_CONNECTOR,
    })
    dispatch(push(`/connectors/generated/${uuid}/${key}/download`))
  }
}
