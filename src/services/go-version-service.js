import async from 'async'

export function getLatestIgnitionVersion(callback) {
  callback(null, 'v8.2.0')
}

export function getLatestInstallerVersion(callback) {
  callback(null, 'v2.0.10')
}

export function getAllLatestVersions(callback) {
  async.parallel({
    ignitionVersion: getLatestIgnitionVersion,
    installerVersion: getLatestInstallerVersion,
  }, callback)
}
