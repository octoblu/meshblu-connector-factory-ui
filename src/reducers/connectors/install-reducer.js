import UserAgentParser from 'ua-parser-js'
import {FETCH_DOWNLOAD_URL_SUCCESS} from '../../constants/action-types'

const initialState = {
  downloadURL: null,
}

const ARCH_MAP = {
  'ia32': '386',
  'amd64': 'amd64',
}

const GITHUB_RELEASE_PREFIX="https://github.com/octoblu/electron-meshblu-connector-installer/releases/download"


export default function types(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOWNLOAD_URL_SUCCESS:
    console.log('action', action)
      return { ...state, downloadURL: downloadURLFromDetails(action.details)}

    default:
      return state
  }
}

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
