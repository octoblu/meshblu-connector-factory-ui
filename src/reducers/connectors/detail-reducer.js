import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'

const initialState = {
  selectedVersion: {
    latest: false,
    version: null,
    details: {},
  },
  info: {
    tags: {},
  },
  latestVersion: {
    latest: true,
    version: null,
    details: {},
  },
  updatedAt: null,
}

function getVersion(version) {
  return version.replace('v', '')
}

function getCurrentVersion({ details, version }) {
  return {
    version: getVersion(version),
    latest: _.first(_.keys(details.tags)) === version,
    details: details.tags[version],
  }
}

function getLastestVersion({ details }) {
  const version = _.first(_.keys(details.tags))
  return {
    version: getVersion(version),
    latest: true,
    details: details.tags[version],
  }
}

function getVersionsState(action) {
  return {
    info: action.details,
    latestVersion: getLastestVersion(action),
    selectedVersion: getCurrentVersion(action),
  }
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS:
      return { ...state, ...getVersionsState(action), updatedAt: Date.now() }

    case actionTypes.SELECT_VERSION:
      return { ...state, selectedVersion: action.selectedVersion }

    default:
      return state
  }
}
