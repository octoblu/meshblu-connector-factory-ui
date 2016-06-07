import request from 'superagent';
import * as actionTypes from '../../constants/action-types';
import { getDevices } from '../../services/device-service';
import { fetchConnectorDetails } from '../connectors/detail-actions'

function fetchMyDevicesRequest() {
  return {
    type: actionTypes.FETCH_MY_DEVICES_REQUEST,
  }
}

function fetchMyDevicesSuccess({ devices, useBaseProps }) {
  return {
    type: actionTypes.FETCH_MY_DEVICES_SUCCESS,
    devices,
    useBaseProps,
  }
}

function fetchMyDevicesFailure(error) {
  return {
    type: actionTypes.FETCH_MY_DEVICES_FAILURE,
    error,
  }
}

export function fetchMyDevices({ useBaseProps }) {
  return (dispatch) => {
    dispatch(fetchMyDevicesRequest())
    getDevices((error, devices) => {
      if(error) {
        dispatch(fetchMyDevicesFailure(error))
        return
      }
      dispatch(fetchMyDevicesSuccess({ devices, useBaseProps }))
    })
  }
}

function fetchDeviceRequest() {
  return {
    type: actionTypes.FETCH_DEVICE_REQUEST,
  }
}

function fetchDeviceSuccess({ device, useBaseProps }) {
  return {
    type: actionTypes.FETCH_DEVICE_SUCCESS,
    device,
    useBaseProps,
  }
}

function fetchDeviceFailure(error) {
  return {
    type: actionTypes.FETCH_DEVICE_FAILURE,
    error,
  }
}

export function fetchDevice({ uuid, useBaseProps }) {
  return (dispatch) => {
    dispatch(fetchDeviceRequest())
    getDevice({ uuid }, (error, device) => {
      if(error) {
        dispatch(fetchDeviceFailure(error))
        return
      }
      dispatch(fetchConnectorDetails({ connector: device.connector }))
      dispatch(fetchDeviceSuccess({ device, useBaseProps }))
    })
  }
}
