import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import available from './things/available-reducer';
import devices from './things/devices-reducer';
import toast from './toast';

const rootReducer = combineReducers({
  available,
  devices,
  toast,
  routing: routerReducer,
})

export default rootReducer
