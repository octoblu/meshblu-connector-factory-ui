import _ from 'lodash'
import * as actionTypes from '../../constants/action-types'
import { fetchAvailableConnectors } from '../things/available-actions'
import { fetchOctobluUser, getMeshbluConfig } from '../../helpers/authentication'
import { setFetching } from '../page-actions'
import { ravenSetUserContext } from '../../helpers/octoblu-raven'

function fetchOctobluUserSuccess({ user, uuid, token }) {
  return {
    type: actionTypes.FETCH_OCTOBLU_USER_SUCCESS,
    user,
    uuid,
    token,
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
      if (error || !user) {
        dispatch(authenticateUser())
      }
      const { uuid, token } = getMeshbluConfig()
      dispatch(fetchOctobluUserSuccess({ user, uuid, token }))
      dispatch(fetchAvailableConnectors({ user }))
      const email = _.get(user, 'octoblu.email')
      ravenSetUserContext({ uuid, email })
      dispatch(setFetching(false))
    })
  }
}
