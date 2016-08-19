import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import octoblu from './octoblu/user-reducer'
import details from './connectors/detail-reducer'
import connector from './connectors/connector-reducer'
import availableDownloads from './connectors/available-downloads-reducer'
import install from './connectors/install-reducer'
import available from './things/available-reducer'
import devices from './things/devices-reducer'
import device from './things/device-reducer'
import statusDevice from './things/status-device-reducer'
import page from './page-reducer'
import toast from './toast-reducer'

const rootReducer = combineReducers({
  octoblu,
  details,
  connector,
  available,
  availableDownloads,
  devices,
  device,
  install,
  statusDevice,
  page,
  toast,
  routing: routerReducer,
})

export default rootReducer
