import UserAgentParser from 'ua-parser-js'
import {FETCH_DOWNLOAD_LINK_SUCCESS} from '../../constants/action-types'

const initialState = {
  downloadLink: null,
  os: null,
  arch: null,
}

export default function types(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOWNLOAD_LINK_SUCCESS:
    console.log('action', action)
      return { ...state, downloadLink: downloadLinkFromDetails(action.details),  ...getOSandArch()}

    default:
      return state
  }
}

function downloadLinkFromDetails(details) {
  const {os,arch} = getOSandArch()

  console.log('downloadLinkFromDetails', {os, arch})
  return _.get(details, 'latest.assets[0].name')
}

function getOSandArch() {
  const parser = new UserAgentParser()
  const os = parser.getOS().name

  if (os === "Mac OS") return {os: 'darwin', arch: 'amd64'}
  return {os: os, arch: parser.getCPU().architecture}
}
