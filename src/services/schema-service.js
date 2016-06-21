import request from 'superagent';

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
  const schemasUrl = getSchemaURL(pkg)
  if (!schemasUrl) {
    callback(null, {})
    return
  }
  request.get(schemasUrl)
    .end((error, response) => {
      if (error) {
        callback(error);
        return;
      }
      if (!response.ok) {
        callback(new Error('Invalid Response'))
        return;
      }
      const { body, text } = response;
      let jsonResponse = body;
      if (!body && text) {
        try {
          jsonResponse = JSON.parse(text);
        } catch (error) {
          callback(new Error('Unable to Parse Schema'));
          return;
        }
      }
      callback(null, jsonResponse);
    })
}
