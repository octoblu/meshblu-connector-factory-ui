import _ from 'lodash'
import { connectorDetails } from '../services/detail-service'
const INSTALLER_BASE_URI = 'https://github.com/octoblu/electron-meshblu-connector-installer'

export function getFileExtension({ platform }) {
  if (/^darwin/.test(platform)) {
    return 'dmg'
  }
  return 'zip'
}

export function getInstallerUri({ platform }, callback) {
  connectorDetails({ githubSlug: 'octoblu/electron-meshblu-connector-installer' }, (error, info) => {
    if (error) return callback(error)
    const latest = _.first(_.values(info.tags))
    if (!latest) {
      callback(new Error('Missing latest'))
      return
    }
    const asset = _.find(latest.assets, (asset = {}) => {
      return asset.name.indexOf(platform) > -1
    })

    if (!asset) {
      callback(new Error('Unable to get latest installer release'))
      return
    }
    const tag = _.first(_.keys(info.tags))
    callback(null, `${INSTALLER_BASE_URI}/releases/download/${tag}/${asset.name}`)
  })
}

export function getDownloadUri({ uri, fileName }) {
  const uriEncoded = encodeURIComponent(uri)
  const fileNameEncoded = encodeURIComponent(fileName)
  return `https://file-downloader.octoblu.com/download?fileName=${fileNameEncoded}&uri=${uriEncoded}`
}

export function getFileName({ otp, platform }) {
  const ext = getFileExtension({ platform })
  return `MeshbluConnectorInstaller-${otp}.${ext}`
}
