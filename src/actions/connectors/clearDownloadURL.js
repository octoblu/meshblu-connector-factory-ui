import * as actionTypes from '../../constants/action-types'

function clearDownloadURLAction() {
  return {
    type: actionTypes.FETCH_DOWNLOAD_URL_CLEAR,
  }
}

export default function clearDownloadURL() {
  return (dispatch) => {
    dispatch(clearDownloadURLAction())
  }
}
