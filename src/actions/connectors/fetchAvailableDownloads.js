import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'
import { getAvailableDownloads } from '../../services/available-downloads-service'

export default function fetchAvailableDownloads({ availableDownloads, error, fetching, otp }){
  return (dispatch) => {
    if (error) return
    if (fetching) return
    if (!_.isEmpty(availableDownloads)) return

    dispatch(fetchAvailableDownloadsFetching())

    getAvailableDownloads({ otp }, (error, availableDownloads) => {
      if (error) {
        dispatch(fetchAvailableDownloadsFailure({ error }))
        return
      }
      dispatch(fetchAvailableDownloadsSuccess({ availableDownloads }))
    })
  }
}

function fetchAvailableDownloadsFetching() {
  return {
    type: actionTypes.FETCH_AVAILABLE_DOWNLOADS_FETCHING,
  }
}

function fetchAvailableDownloadsFailure({ error }) {
  return {
    type: actionTypes.FETCH_AVAILABLE_DOWNLOADS_FAILURE,
    error: error,
  }
}

function fetchAvailableDownloadsSuccess({ availableDownloads }) {
  return {
    type: actionTypes.FETCH_AVAILABLE_DOWNLOADS_SUCCESS,
    availableDownloads: availableDownloads,
  }
}
