import async from 'async'

export function getLatestIgnitionVersion(callback) {
  callback(null, 'v8.1.0')
}

export function getLatestInstallerVersion(callback) {
  callback(null, 'v2.0.10')
}

export function getLatestAssemblerVersion(callback) {
  callback(null, 'v14.1.0')
}

export function getLatestDependencyManagerVersion(callback) {
  callback(null, 'v3.1.0')
}

export function getAllLatestVersions(callback) {
  async.parallel({
    dependencyManagerVersion: getLatestDependencyManagerVersion,
    connectorAssemblerVersion: getLatestAssemblerVersion,
    ignitionVersion: getLatestIgnitionVersion,
    installerVersion: getLatestInstallerVersion,
  }, callback)
}
