import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'
import { connectorDetails } from '../../services/detail-service'

export default function fetchElectronDownloadURL({ downloadURL, error, fetching, otp }){
  return (dispatch) => {
    if (fetching) return
    if (downloadURL || error) return

    dispatch(fetchDownloadURLFetching())

    connectorDetails({ githubSlug: 'octoblu/electron-meshblu-connector-installer' }, (error, details) => {
      if (error) {
        dispatch(fetchDownloadURLFailure({ error }))
        return
      }
      dispatch(fetchDownloadURLSuccess({ details, otp }))
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

function fetchDownloadURLSuccess({ details, otp }) {
  return {
    type: actionTypes.FETCH_DOWNLOAD_URL_SUCCESS,
    details: details,
    otp: otp,
  }
}
