import * as actionTypes from '../../constants/action-types';
import { connectorDetails } from '../../services/detail-service';

function fetchConnectorDetailsRequest() {
  return {
    type: actionTypes.FETCH_CONNECTOR_DETAILS_REQUEST,
  }
}

function fetchConnectorDetailsSuccess(info) {
  return {
    type: actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS,
    info,
  }
}

function fetchConnectorDetailsFailure(error) {
  return {
    type: actionTypes.FETCH_CONNECTOR_DETAILS_FAILURE,
    error,
  }
}

export function fetchConnectorDetails({ connector }) {
  return (dispatch) => {
    dispatch(fetchConnectorDetailsRequest())
    connectorDetails({ connector }, (error, details) => {
      if (error) {
        dispatch(fetchConnectorDetailsFailure(error))
        return
      }
      dispatch(fetchConnectorDetailsSuccess(details));
    })
  }
}

export function selectVersion(selectedVersion) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_VERSION,
      selectedVersion,
    })
  }
}
