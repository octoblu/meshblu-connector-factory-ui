import { handleActions } from 'redux-actions';

const initialState = null

const reducers =  handleActions({
  ['SET_TOAST']: (state = initialState, action) => action.payload
}, initialState)

export default reducers
