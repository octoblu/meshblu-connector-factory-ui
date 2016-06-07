import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import details from './connectors/detail-reducer';
import connector from './connectors/connector-reducer';
import available from './things/available-reducer';
import devices from './things/devices-reducer';
import toast from './toast';

const rootReducer = combineReducers({
  details,
  connector,
  available,
  devices,
  toast,
  routing: routerReducer,
})

export default rootReducer
