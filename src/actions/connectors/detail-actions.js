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
  if (!details.latest) return `v${version.replace('v', '')}`
  return `v${details.latest.tag.replace('v', '')}`
}

export function fetchConnectorDetails({ githubSlug, version, fetching = true }) {
  return (dispatch) => {
    dispatch(setFetching(fetching))
    connectorDetails({ githubSlug }, (error, details) => {
      dispatch(setFetching(false))
      if (error) {
        dispatch(setError(error))
        return
      }
      dispatch(fetchConnectorDetailsSuccess({ details, version: getVersion({ details, version }) }))
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
