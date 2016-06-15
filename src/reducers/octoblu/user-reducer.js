import * as actionTypes from '../../constants/action-types'
import {
  getAuthenticationUri,
  removeCookie,
} from '../../helpers/authentication';

const initialState = {
  user: {},
  updatedAt: null,
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTHENICATE_OCTOBLU_USER:
      removeCookie()
      window.location = getAuthenticationUri()
      return initialState

    case actionTypes.FETCH_OCTOBLU_USER_SUCCESS:
      return { ...state, user: action.user, updatedAt: Date.now() }

    default:
      return state
  }
}
