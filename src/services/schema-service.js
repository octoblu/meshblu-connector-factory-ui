import { getJSON } from './fetch-json-service'
const DOWNLOAD_RELEASE_URI = 'https://file-downloader.octoblu.com/github-release'

function getSchemaURL({ githubSlug, version }) {
  const tag = `v${version.replace('v', '')}`
  return `${DOWNLOAD_RELEASE_URI}/${githubSlug}/${tag}/schemas.json`
}

export function getSchema({ githubSlug, version }, callback) {
  const uri = getSchemaURL({ githubSlug, version })
  if (!uri) {
    callback(null, {})
    return
  }
  getJSON({ uri }, (error, schema = {}) => {
    if (error) return callback(null)
    callback(null, schema.schemas || {})
  })
}
