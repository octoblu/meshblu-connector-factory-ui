import _ from 'lodash'

import { resolveOtp } from './otp-service'
import { connectorDetails } from '../services/detail-service'

export function getAvailableDownloads({ availableDownloads, fetching, otp }, callback) {
  resolveOtp({ otp }, (error, info) => {
    if (error) return callback(error)

    const { githubSlug } = info.metadata
    return getLatestReleases({ githubSlug }, callback)
  })
}

function getLatestReleases({ githubSlug }, callback) {
  connectorDetails({ githubSlug }, (error, details) => {
    if (error) return callback(error)

    return callback(null, parseAvailableDownloads(details))
  })
}

function parseAvailableDownloads(details) {
  const availableDownloads = {}

  _.each(details.latest.assets, (asset) => {
    const osArch = parseOSArch(asset.name)
    availableDownloads[osArch] = true
  })

  return availableDownloads
}

function parseOSArch(filename) {
  const filenameNoExt = _.replace(filename, /\..*$/g, '')
  const parts = _.split(filenameNoExt, '-')
  const os    = _.nth(parts, -2)
  const arch  = _.nth(parts, -1)

  if (_.isEmpty(os) || _.isEmpty(arch)) return null

  return `${os}-${arch}`
}
