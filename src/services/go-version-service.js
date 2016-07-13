import async from 'async'
import { connectorDetails } from './detail-service'

export function getLatestGoVersion({ githubSlug }, callback) {
  connectorDetails({ githubSlug }, (error, info) => {
    if (error) return callback(error)
    const { latest } = info || {}
    if (!latest || !latest.tag) {
      callback(new Error('Invalid release'))
      return
    }
    const tag = `v${latest.tag.replace('v', '')}`
    callback(null, tag)
  })
}

export function getLatestIgnitionVersion(callback) {
  const githubSlug = 'octoblu/go-meshblu-connector-ignition'
  getLatestGoVersion({ githubSlug }, callback)
}

export function getLatestAssemblerVersion(callback) {
  const githubSlug = 'octoblu/go-meshblu-connector-assembler'
  getLatestGoVersion({ githubSlug }, callback)
}

export function getLatestDependencyManagerVersion(callback) {
  const githubSlug = 'octoblu/go-meshblu-connector-dependency-manager'
  getLatestGoVersion({ githubSlug }, callback)
}

export function getAllLatestVersions(callback) {
  async.parallel({
    dependencyManagerVersion: getLatestDependencyManagerVersion,
    connectorAssemblerVersion: getLatestAssemblerVersion,
    ignitionVersion: getLatestIgnitionVersion,
  }, callback)
}
