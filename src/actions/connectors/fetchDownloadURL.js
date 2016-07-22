import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'
import { connectorDetails } from '../../services/detail-service'

export default function fetchElectronDownloadURL({fetching, downloadURL}){
  return (dispatch) => {
    if (fetching) return
    if (!_.isEmpty(downloadURL)) return
    
    dispatch(fetchDownloadURLFetching())

    connectorDetails({ githubSlug: 'octoblu/electron-meshblu-connector-installer' }, (error, details) => {
      if (error) {
        dispatch(fetchDownloadURLFailure({error}))
        return
      }
      dispatch(fetchDownloadURLSuccess({ details }))
    })
  }
}

function fetchDownloadURLFetching() {
  return {
    type: actionTypes.FETCH_DOWNLOAD_URL_FETCHING,
  }
}

function fetchDownloadURLFailure() {
  return {
    type: actionTypes.FETCH_DOWNLOAD_URL_FAILURE,
  }
}

function fetchDownloadURLSuccess({ details }) {
  return {
    type: actionTypes.FETCH_DOWNLOAD_URL_SUCCESS,
    details: details,
  }
}
