import { getJSON } from './fetch-json-service'
const DOWNLOAD_RELEASE_URI = 'https://file-downloader.octoblu.com/github-release'

function getSchemaURL({ meshbluConnector, version }) {
  const { schemasUrl, githubSlug } = meshbluConnector || {}
  if (schemasUrl) {
    // return schemasUrl
  }
  if (!githubSlug) {
    return
  }
  return `${DOWNLOAD_RELEASE_URI}/${githubSlug}/v${version}/schemas.json`
}

export function getSchema({ pkg }, callback) {
  const uri = getSchemaURL(pkg)
  if (!uri) {
    callback(null, {})
    return
  }
  getJSON({ uri }, callback)
}
