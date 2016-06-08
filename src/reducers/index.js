import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import details from './connectors/detail-reducer';
import connector from './connectors/connector-reducer';
import available from './things/available-reducer';
import devices from './things/devices-reducer';
import device from './things/device-reducer';
import statusDevice from './things/status-device-reducer';
import page from './page-reducer';
import toast from './toast-reducer';

const rootReducer = combineReducers({
  details,
  connector,
  available,
  devices,
  device,
  statusDevice,
  page,
  toast,
  routing: routerReducer,
})

export default rootReducer
