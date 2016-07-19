import * as actionTypes from '../../constants/action-types'
import { setFetching, setError } from '../page-actions'
import { connectorDetails } from '../../services/detail-service'

function fetchConnectorDetailsSuccess({ details, version }) {
  return {
    type: actionTypes.FETCH_CONNECTOR_DETAILS_SUCCESS,
    details,
    version,
  }
}

function getVersion({ details, version }) {
  if (version && details.tags[version]) return `v${version.replace('v', '')}`
  if (version && details.latest == null) return `v${version.replace('v', '')}`
  return `v${details.latest.tag.replace('v', '')}`
}

export function fetchConnectorDetails({ githubSlug, version, fetching = true }) {
  return (dispatch) => {
    if (fetching) {
      dispatch(setFetching(true))
    }
    connectorDetails({ githubSlug }, (error, details) => {
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(fetchConnectorDetailsSuccess({ details, version: getVersion({ details, version }) }))
      if (fetching) {
        dispatch(setFetching(false))
      }
    })
  }
}

export function selectVersion(selectedVersion) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECT_VERSION,
      selectedVersion,
    })
  }
}
