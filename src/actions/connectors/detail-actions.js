import request from 'superagent';
import * as actionTypes from '../../constants/action-types';
import { getMeshbluConfig } from '../../helpers/authentication';
import { CONNECTOR_SERVICE_URI } from '../../constants/config'

function fetchConnectorDetailsRequest() {
  return {
    type: actionTypes.FETCH_CONNECTOR_DETAILS_REQUEST
  }
}

function fetchConnectorDetailsSuccess(info) {
  return {
    type: actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS,
    info
  }
}

function fetchConnectorDetailsFailure(error) {
  return {
    type: actionTypes.FETCH_CONNECTOR_DETAILS_FAILURE,
    error
  }
}

export function fetchConnectorDetails({ connector }) {
  return (dispatch) => {
    dispatch(fetchConnectorDetailsRequest())
    request.get(`${CONNECTOR_SERVICE_URI}/${connector}`)
      .end((error, response) => {
        if (error) {
          dispatch(fetchConnectorDetailsFailure(error))
          return
        }
        if (!response.ok) {
          dispatch(fetchConnectorDetailsFailure(new Error('Invalid Response')))
          return
        }
        dispatch(fetchConnectorDetailsSuccess(response.body));
      });
  }
}

export function selectVersion(selectedVersion) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_VERSION,
      selectedVersion
    })
  }
}
