import _ from 'lodash'
import { getAllLatestVersions } from '../services/go-version-service'

export function getConnectorName(connector) {
  return connector.replace(/^meshblu-(connector-)/, '')
}

export function getFriendlyName(connector) {
  const name = getConnectorName(connector)
  return `Connector ${_.startCase(name)}`
}

export function getConnectorMetadata({ connector, githubSlug, version, octoblu, meshblu }, callback) {
  const betterVersion = version.replace('v', '')
  const tag = `v${betterVersion}`

  getAllLatestVersions((error, versions) => {
    if (error != null) return callback(error)
    const {
      ignitionVersion,
      installerVersion,
    } = versions

    const defaults = {
      meshblu: { domain: 'octoblu.com' },
    }

    callback(null, _.defaultsDeep({
      connector: getConnectorName(connector),
      tag,
      githubSlug,
      installerVersion,
      ignitionVersion,
      octoblu,
      meshblu,
    }, defaults))
  })
}
