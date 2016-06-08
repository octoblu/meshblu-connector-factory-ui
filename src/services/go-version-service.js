import request from 'superagent';
import async from 'async';

const RAW_GITHUB_URI = 'https://raw.githubusercontent.com';

export function getLatestGoVersion({ githubSlug }, callback) {
  return request
    .get(`${RAW_GITHUB_URI}/${githubSlug}/master/version.go`)
    .end((error, response) => {
      if (error) return callback(error);
      if (!response.ok) return callback(new Error('Invalid Response'));
      const rgx = new RegExp('"(.+)"')
      const { text } = response
      let version = text.match(rgx)[1]
      version = version.replace('v', '')
      version = `v${version}`
      return callback(null, version);
    });
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
