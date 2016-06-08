import _ from 'lodash';
import * as actionTypes from '../../constants/action-types'
import { BASE_STATUS_DEVICE_PROPS } from '../../constants/devices'

const initialState = {
  item: {},
  updatedAt: null,
}

function getDevice({ device, useBaseProps }) {
  if (!useBaseProps) return device
  return _.pick(device, BASE_STATUS_DEVICE_PROPS)
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NO_STATUS_DEVICE:
      return initialState

    case actionTypes.FETCH_DEVICE_SUCCESS:
      return { ...state, item: getDevice(action), updatedAt: Date.now() }

    default:
      return state
  }
}
