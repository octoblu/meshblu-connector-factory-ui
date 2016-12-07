import * as actionTypes from '../../constants/action-types'
import { setFetching, setError } from '../page-actions'
import {
  getDevice,
  sendMessage,
  updateDevice,
} from '../../services/device-service'

function getStatusDeviceUUID({ statusDevice } = {}) {
  return statusDevice
}

function noStatusDevice() {
  return {
    type: actionTypes.NO_STATUS_DEVICE,
  }
}

export function clearStatusDeviceFromCache() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_STATUS_DEVICE,
    })
  }
}

function pingStatusDeviceSuccess() {
  return {
    type: actionTypes.PING_STATUS_DEVICE_SUCCESS,
  }
}

function fetchStatusDeviceSuccess({ device, useBaseProps }) {
  return {
    type: actionTypes.FETCH_STATUS_DEVICE_SUCCESS,
    device,
    useBaseProps,
  }
}
function updateStatusDeviceSuccess() {
  return {
    type: actionTypes.UPDATE_STATUS_DEVICE_SUCCESS,
  }
}

export function fetchStatusDevice({ device, useBaseProps, fetching = true }) {
  return (dispatch) => {
    const statusDeviceUUID = getStatusDeviceUUID(device)
    if (!statusDeviceUUID) {
      dispatch(noStatusDevice())
      return
    }
    if (fetching) {
      dispatch(setFetching(true))
    }
    getDevice({ uuid: statusDeviceUUID }, (error, device) => {
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(fetchStatusDeviceSuccess({ device, useBaseProps }))
      if (fetching) {
        dispatch(setFetching(false))
      }
    })
  }
}

export function pingStatusDevice({ device }) {
  return (dispatch) => {
    const statusDeviceUUID = getStatusDeviceUUID(device)
    if (statusDeviceUUID == null) {
      dispatch(noStatusDevice())
      return
    }
    sendMessage({
      devices: [statusDeviceUUID],
      topic: 'ping',
    }, (error) => {
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(pingStatusDeviceSuccess())
    })
  }
}

export function updateStatusDevice({ device, properties }) {
  return (dispatch) => {
    const statusDeviceUUID = getStatusDeviceUUID(device)
    if (statusDeviceUUID == null) {
      dispatch(noStatusDevice())
      return
    }
    dispatch(setFetching(true))
    updateDevice({ uuid: statusDeviceUUID, properties }, (error) => {
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(updateStatusDeviceSuccess())
      dispatch(fetchStatusDevice({ device }))
      dispatch(setFetching(false))
    })
  }
}
