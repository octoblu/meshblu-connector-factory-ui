import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'
import { BASE_DEVICE_PROPS } from '../../constants/devices'

const initialState = {
  item: {},
  updatedAt: null,
  githubSlug: null,
}

function getDevice({ device, useBaseProps }) {
  if (!useBaseProps) return device
  return _.pick(device, BASE_DEVICE_PROPS)
}

function getGithubSlug({ device }) {
  return _.get(device, 'connectorMetadata.githubSlug') || `octoblu/${device.connector}`
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DEVICE_SUCCESS:
      return { ...state, item: getDevice(action), githubSlug: getGithubSlug(action), updatedAt: Date.now() }

    case actionTypes.CLEAR_DEVICE:
      return initialState

    default:
      return state
  }
}
