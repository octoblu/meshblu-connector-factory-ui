import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'
import { connectorDetails } from '../../services/detail-service'

export default function clearDownloadURL({ downloadURL, error, fetching, otp }){
  return (dispatch) => {
    dispatch(clearDownloadURL())
  }
}

function clearDownloadURL() {
  return {
    type: actionTypes.FETCH_DOWNLOAD_URL_CLEAR,
  }
}
