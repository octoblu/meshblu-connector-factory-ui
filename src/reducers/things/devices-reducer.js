import * as actionTypes from '../../constants/action-types'
import { BASE_DEVICE_PROPS } from '../../constants/devices'
import _ from 'lodash';

const initialState = {
  error: null,
  fetching: false,
  items: [],
}

function getDevices({ devices, useBaseProps }) {
  if (!useBaseProps) return devices
  return _.map(devices, BASE_DEVICE_PROPS)
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_MY_DEVICES_REQUEST:
      return { ...initialState, fetching: true }

    case actionTypes.FETCH_MY_DEVICES_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.FETCH_MY_DEVICES_SUCCESS:
      return { ...state, items: getDevices(action), fetching: false, error: null }

    default:
      return state
  }
}
