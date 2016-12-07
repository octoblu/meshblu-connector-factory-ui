import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'
import { BASE_STATUS_DEVICE_PROPS } from '../../constants/devices'

const initialState = {
  item: {},
  updatedAt: null,
  pingSentAt: null,
}

function getDevice({ device, useBaseProps }) {
  if (!useBaseProps) return device
  return _.pick(device, BASE_STATUS_DEVICE_PROPS)
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NO_STATUS_DEVICE:
      return initialState

    case actionTypes.FETCH_STATUS_DEVICE_SUCCESS:
      return { ...state, item: getDevice(action), updatedAt: Date.now() }

    case actionTypes.CLEAR_STATUS_DEVICE:
      return initialState

    case actionTypes.PING_STATUS_DEVICE_SUCCESS:
      return { ...state, pingSentAt: Date.now() }
    default:
      return state
  }
}
