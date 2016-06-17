import * as actionTypes from '../../constants/action-types';
import { setFetching, setError } from '../page-actions'

import {
  getDevices,
  getDevice,
  updateDevice,
} from '../../services/device-service';

import { fetchConnectorDetails } from '../connectors/detail-actions'

function fetchMyDevicesSuccess({ devices, useBaseProps }) {
  return {
    type: actionTypes.FETCH_MY_DEVICES_SUCCESS,
    devices,
    useBaseProps,
  }
}

function clearMyDevicesUpdatedAtResult() {
  return {
    type: actionTypes.CLEAR_MY_DEVICES,
  }
}

export function clearMyDevicesUpdatedAt() {
  return (dispatch) => {
    dispatch(clearMyDevicesUpdatedAtResult())
  }
}

export function fetchMyDevices({ useBaseProps }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    getDevices((error, devices) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(fetchMyDevicesSuccess({ devices, useBaseProps }))
    })
  }
}

function fetchDeviceSuccess({ device, useBaseProps }) {
  return {
    type: actionTypes.FETCH_DEVICE_SUCCESS,
    device,
    useBaseProps,
  }
}

export function fetchDevice({ uuid, useBaseProps, updateDetails = true, fetching = true }) {
  return (dispatch) => {
    dispatch(setFetching(fetching))
    getDevice({ uuid }, (error, device) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      if (updateDetails) {
        const { connector, connectorMetadata } = device
        const { version } = connectorMetadata
        dispatch(fetchConnectorDetails({ connector, version, fetching }))
      }
      dispatch(fetchDeviceSuccess({ device, useBaseProps }))
    })
  }
}

function updateDeviceSuccess() {
  return {
    type: actionTypes.UPDATE_DEVICE_SUCCESS,
  }
}

export function updateDeviceAction({ uuid, properties }) {
  return (dispatch) => {
    dispatch(setFetching(true))
    updateDevice({ uuid, properties }, (error) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(clearMyDevicesUpdatedAtResult())
      dispatch(updateDeviceSuccess())
      dispatch(fetchDevice({ uuid }))
    });
  }
}
