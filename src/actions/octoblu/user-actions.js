import * as actionTypes from '../../constants/action-types';
import { fetchOctobluUser } from '../../helpers/authentication';
import { setFetching } from '../page-actions'

function fetchOctobluUserSuccess(user) {
  return {
    type: actionTypes.FETCH_OCTOBLU_USER_SUCCESS,
    user,
  }
}

function authenticateUser() {
  return {
    type: actionTypes.AUTHENICATE_OCTOBLU_USER,
  }
}

export function fetchOctobluUserAction() {
  return (dispatch) => {
    dispatch(setFetching(true))
    fetchOctobluUser((error, user) => {
      dispatch(setFetching(false))
      if (error || !user) {
        dispatch(authenticateUser())
      }
      dispatch(fetchOctobluUserSuccess(user))
    })
  }
}
