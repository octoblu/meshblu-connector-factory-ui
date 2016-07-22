import _ from 'lodash'
import { FETCH_DOWNLOAD_URL_SUCCESS, FETCH_DOWNLOAD_URL_FAILURE } from '../../constants/action-types'
import { connectorDetails } from '../../services/detail-service'

export default function fetchElectronDownloadURL(){
  return (dispatch) => {
    connectorDetails({ githubSlug: 'octoblu/electron-meshblu-connector-installer' }, (error, details) => {
      if (error) {
        dispatch(fetchDownloadURLFailure({error}))
        return
      }
      dispatch(fetchDownloadURLSuccess({ details }))
    })
  }
}

function fetchDownloadURLFailure() {
  return {
    type: FETCH_DOWNLOAD_URL_FAILURE,
  }
}

function fetchDownloadURLSuccess({ details }) {
  return {
    type: FETCH_DOWNLOAD_URL_SUCCESS,
    details: details,
  }
}
