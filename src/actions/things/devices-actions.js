import request from 'superagent';
import * as actionTypes from '../../constants/action-types';
import { getDevices } from '../../services/device-service';

function fetchMyDevicesRequest() {
  return {
    type: actionTypes.FETCH_MY_DEVICES_REQUEST
  }
}

function fetchMyDevicesSuccess(devices) {
  return {
    type: actionTypes.FETCH_MY_DEVICES_SUCCESS,
    devices
  }
}

function fetchMyDevicesFailure(error) {
  return {
    type: actionTypes.FETCH_MY_DEVICES_FAILURE,
    error
  }
}

export function fetchMyDevices() {
  return (dispatch) => {
    dispatch(fetchMyDevicesRequest())
    getDevices((error, devices) => {
      if(error) {
        dispatch(fetchMyDevicesFailure(error))
        return
      }
      dispatch(fetchMyDevicesSuccess(devices))
    })
  }
}
