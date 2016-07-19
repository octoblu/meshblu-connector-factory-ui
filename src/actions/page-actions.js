import * as actionTypes from '../constants/action-types'

function setFetchingResult(fetching) {
  return {
    type: actionTypes.PAGE_LAYOUT_FETCHING,
    fetching,
  }
}

function resetPageStateResult() {
  return {
    type: actionTypes.PAGE_LAYOUT_RESET,
  }
}

function setErrorResult(error) {
  return {
    type: actionTypes.PAGE_LAYOUT_ERROR,
    error,
  }
}

function setBreadcrumbsResult(fragments = []) {
  return {
    type: actionTypes.PAGE_LAYOUT_BREADCRUMBS,
    fragments,
  }
}

export function setFetching(fetching) {
  return (dispatch) => {
    dispatch(setFetchingResult(fetching))
  }
}

export function setError(error) {
  return (dispatch) => {
    dispatch(resetPageStateResult())
    dispatch(setErrorResult(error))
  }
}

export function setBreadcrumbs(fragments) {
  return (dispatch) => {
    dispatch(setBreadcrumbsResult(fragments))
  }
}

export function resetPageState() {
  return (dispatch) => {
    dispatch(resetPageStateResult())
  }
}
