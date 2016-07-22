import UserAgentParser from 'ua-parser-js'
import * as actionTypes from '../../constants/action-types'

const initialState = {
  downloadURL: null,
  error: null,
  fetching: false,
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DOWNLOAD_URL_FAILURE:
      return { fetching: false, downloadURL: null, error: action.error }
    case actionTypes.FETCH_DOWNLOAD_URL_FETCHING:
      return { fetching: true,  downloadURL: null, error: null }
    case actionTypes.FETCH_DOWNLOAD_URL_SUCCESS:
      return { fetching: false, downloadURL: downloadURLFromDetails(action.details), error: null }

    default:
      return state
  }
}





const ARCH_MAP = {
  'ia32': '386',
  'amd64': 'amd64',
}

const GITHUB_RELEASE_PREFIX="https://github.com/octoblu/electron-meshblu-connector-installer/releases/download"

function downloadURLFromDetails(details) {
  console.log('details', details)
  const linkSuffix = getURLSuffix()
  const tag    = _.get(details, 'latest.tag')
  const assets = _.get(details, 'latest.assets')
  const asset = _.find(assets, (asset) => _.endsWith(asset.name, linkSuffix))

  if (!asset) {
    return `OS NOT SUPPORTED, linkSuffix: ${linkSuffix}`
  }

  return `${GITHUB_RELEASE_PREFIX}/${tag}/${asset.name}`
}

function getURLSuffix() {
  const parser = new UserAgentParser()
  const os = _.lowerCase(parser.getOS().name)

  if (os === "mac os") return 'darwin-amd64.dmg'

  const arch = _.get(ARCH_MAP, parser.getCPU().architecture)
  return `${os}-${arch}.zip`
}
