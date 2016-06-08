import * as actionTypes from '../../constants/action-types'
import { BASE_DEVICE_PROPS } from '../../constants/devices'
import _ from 'lodash';

const initialState = {
  items: [],
}

function getDevices({ devices, useBaseProps }) {
  if (!useBaseProps) return devices
  return _.map(devices, (device) => {
    return _.pick(device, BASE_DEVICE_PROPS)
  })
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_MY_DEVICES_SUCCESS:
      return { ...state, items: getDevices(action) }

    default:
      return state
  }
}
