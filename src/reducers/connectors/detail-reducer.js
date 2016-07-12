import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'

const initialState = {
  selectedVersion: {
    latest: false,
    version: null,
    tag: null,
    details: {},
  },
  info: {
    tags: {},
  },
  latestVersion: {
    latest: true,
    version: null,
    tag: null,
    details: {},
  },
  updatedAt: null,
}

function getVersion(version = '') {
  return `v${version.replace('v', '')}`
}

function filterTags(tags) {
  return _.omitBy(tags, ({ prerelease, draft, assets }) => {
    if (prerelease) return true
    if (draft) return true
    const countOfBundles = _.reduce(assets, (sum, { name }) => {
      if (_.endsWith(name, '.tar.gz') || _.endsWith(name, '.zip')) {
        return sum + 1
      }
      return sum
    }, 0)
    return countOfBundles < 1
  }) || {}
}

function filterAndMapTags(tags, latestTag) {
  return _.mapValues(filterTags(tags), (tag = {}) => {
    tag.latest = latestTag === tag.tag
    tag.version = tag.tag
    return tag
  })
}

function getCurrentVersion({ details, version }) {
  const { latest = {} } = details
  const { tags = {} } = details
  return {
    version: getVersion(version),
    tag: getVersion(version),
    latest: latest.tag === version,
    details: tags[version],
  }
}

function getLastestVersion({ details }) {
  const { latest = {} } = details
  const version = latest.tag
  return {
    version: getVersion(version),
    tag: getVersion(version),
    latest: true,
    details: details.latest,
  }
}

function getVersionsState(action) {
  const { details, version } = action
  const latestVersion = getLastestVersion({ details })
  const selectedVersion = getCurrentVersion({ details, version })
  details.tags = filterAndMapTags(details.tags, latestVersion.version)
  return {
    info: details,
    latestVersion,
    selectedVersion,
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
