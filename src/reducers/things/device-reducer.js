import _ from 'lodash';
import * as actionTypes from '../../constants/action-types'
import { BASE_DEVICE_PROPS } from '../../constants/devices'

const initialState = {
  error: null,
  fetching: false,
  item: {},
}

function getDevice({ device, useBaseProps }) {
  if (!useBaseProps) return device
  return _.pick(device, BASE_DEVICE_PROPS)
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DEVICE_REQUEST:
      return { ...initialState, fetching: true }

    case actionTypes.FETCH_DEVICE_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.FETCH_DEVICE_SUCCESS:
      return { ...state, item: getDevice(action), fetching: false, error: null }

    default:
      return state
  }
}
