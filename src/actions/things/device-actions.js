import request from 'superagent';
import * as actionTypes from '../../constants/action-types';
import { getDevices } from '../../services/device-service';
import { fetchConnectorDetails } from '../connectors/detail-actions'

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

function fetchDeviceRequest() {
  return {
    type: actionTypes.FETCH_DEVICE_REQUEST
  }
}

function fetchDeviceSuccess(device) {
  return {
    type: actionTypes.FETCH_DEVICE_SUCCESS,
    device
  }
}

function fetchDeviceFailure(error) {
  return {
    type: actionTypes.FETCH_DEVICE_FAILURE,
    error
  }
}

export function fetchDevice({ uuid }) {
  return (dispatch) => {
    dispatch(fetchDeviceRequest())
    getDevice({ uuid }, (error, device) => {
      if(error) {
        dispatch(fetchDeviceFailure(error))
        return
      }
      dispatch(fetchConnectorDetails({ connector: device.connector }))
      dispatch(fetchDeviceSuccess(device))
    })
  }
}
