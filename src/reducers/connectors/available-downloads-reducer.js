import * as actionTypes from '../../constants/action-types'

const initialState = {
  availableDownloads: {}
}

export default function types(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.FETCH_AVAILABLE_DOWNlOADS_FAILURE:
    //   break;
    default:
      return state
  }
}
