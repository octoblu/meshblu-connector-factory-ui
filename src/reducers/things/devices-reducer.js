import * as actionTypes from '../../constants/action-types'
import { BASE_DEVICE_PROPS } from '../../constants/devices'

const initialState = {
  error: null,
  fetching: false,
  items: []
}

export default function types(state=initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_MY_DEVICES_REQUEST:
      return { ...initialState, fetching: true }

    case actionTypes.FETCH_MY_DEVICES_FAILURE:
      return { ...initialState, error: action.error }

    case actionTypes.FETCH_MY_DEVICES_SUCCESS:
      let devices = action.devices
      if(action.useBaseProps) {
        devices = _.map(devices, BASE_DEVICE_PROPS)
      }
      return { ...state, items: action.devices, fetching: false, error: null }

    default:
      return state
  }
}
