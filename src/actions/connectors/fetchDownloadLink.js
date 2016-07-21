import _ from 'lodash'
import { FETCH_DOWNLOAD_LINK_SUCCESS, FETCH_DOWNLOAD_LINK_FAILURE } from '../../constants/action-types'
import { connectorDetails } from '../../services/detail-service'

export default function fetchElectronDownloadLink(){
  return (dispatch) => {
    console.log('fetchDownloadLink')
    // dispatch(setFetching(true))
    //
    connectorDetails({ githubSlug: 'octoblu/electron-meshblu-connector-installer' }, (error, details) => {
      if (error) {
        dispatch(fetchDownloadLinkFailure({error}))
        return
      }
      dispatch(fetchDownloadLinkSuccess({ details }))
    })
  }
}

function fetchDownloadLinkFailure() {
  return {
    type: FETCH_DOWNLOAD_LINK_FAILURE,
  }
}

function fetchDownloadLinkSuccess({ details }) {
  return {
    type: FETCH_DOWNLOAD_LINK_SUCCESS,
    details: details,
  }
}
