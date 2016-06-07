import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import available from './things/available-reducer';
import toast from './toast';

const rootReducer = combineReducers({
  available,
  toast,
  routing: routerReducer,
})

export default rootReducer
