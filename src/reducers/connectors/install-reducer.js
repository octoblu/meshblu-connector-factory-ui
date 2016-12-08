import _ from 'lodash'
import UserAgentParser from 'ua-parser-js'
import * as actionTypes from '../../constants/action-types'

const initialState = {
  error: null,
  fetching: false,

  downloadURL: null,
  os: null,
  arch: null,
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DOWNLOAD_URL_FAILURE:
      return { ...initialState, error: action.error }
    case actionTypes.FETCH_DOWNLOAD_URL_FETCHING:
      return { ...initialState, fetching: true }
    case actionTypes.FETCH_DOWNLOAD_URL_SUCCESS:
      return fetchDownloadURLSuccess(state, action)
    case actionTypes.FETCH_DOWNLOAD_URL_CLEAR:
      return { ...initialState }

    default:
      return state
  }
}

const ARCH_MAP = {
  ia32: '386',
  'ia 32': '386',
  amd64: 'amd64',
  'amd 64': 'amd64',
}

const RELEASE_PREFIX = 'https://file-downloader.octoblu.com/installer/octoblu/electron-meshblu-connector-installer'

function fetchDownloadURLSuccess(state, action) {
  const { os, arch, extension }  = getOsArchAndExtension()
  const downloadURL = downloadURLFromDetails(action.details, { os, arch, extension, otp: action.otp })

  if (_.isNull(downloadURL)) return { ...initialState, error: noInstallerAvailableError({ os, arch }) }

  return { ...initialState, os, arch, downloadURL }
}

function downloadURLFromDetails(details, { os, arch, extension, otp }) {
  const filename  = getFilename({ os, arch, extension, otp })
  return `${RELEASE_PREFIX}/${os}/${arch}?fileName=${filename}`
}

function getFilename({ extension, otp }) {
  return `MeshbluConnectorInstaller-${otp}.${extension}`
}

function getOsArchAndExtension() {
  const parser = new UserAgentParser()
  const os = _.lowerCase(parser.getOS().name)
  const architecture = _.lowerCase(parser.getCPU().architecture)

  if (os === 'mac os') return { os: 'darwin', arch: 'amd64', extension: 'dmg' }
  if (os === 'linux' && _.includes(parser.getUA(), 'armv7l')) return { os: 'linux', arch: 'arm', extension: 'zip' }

  const arch = _.get(ARCH_MAP, architecture, architecture)
  return { os, arch, extension: 'zip' }
}

// function getURLSuffix({ os, arch, extension }) {
//   return `${os}-${arch}.${extension}`
// }

function noInstallerAvailableError({ os, arch }) {
  if (!os || !arch) return new Error('Failed to detect operating system/architecture. Please choose an installer manually from the Other Install Options.')
  return new Error(`No GUI Installer Available for ${os}-${arch}. Please choose an installer manually from the Other Install Options.`)
}
