import * as actionTypes from '../../constants/action-types';
import { setFetching, setError } from '../page-actions'
import _ from 'lodash';
import {
  getDevice,
  sendMessage,
  updateDevice,
} from '../../services/device-service';

function getStatusDeviceUUID({ statusDevice } = {}) {
  return statusDevice
}

function noStatusDevice() {
  return {
    type: actionTypes.NO_STATUS_DEVICE,
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

export function fetchStatusDevice({ device, useBaseProps, fetching = true, isPingResult = false }) {
  return (dispatch) => {
    const statusDeviceUUID = getStatusDeviceUUID(device)
    if (!statusDeviceUUID) {
      dispatch(noStatusDevice())
      return
    }
    dispatch(setFetching(fetching))
    getDevice({ uuid: statusDeviceUUID }, (error, device) => {
      if (error) {
        dispatch(setError(error))
        return
      }
      if (isPingResult) {
        _.delay(() => {
          dispatch(pingStatusDeviceSuccess({ device, useBaseProps }))
        }, 2000)
      }
      dispatch(fetchStatusDeviceSuccess({ device, useBaseProps }))
    })
  }
}

export function pingStatusDevice({ device, useBaseProps }) {
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
      _.delay(() => {
        dispatch(fetchStatusDevice({ device, useBaseProps, fetching: false, isPingResult: true }))
      }, 2000)
    });
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
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(updateStatusDeviceSuccess())
    });
  }
}
