import request from 'superagent'
import { CONNECTOR_DETAIL_SERVICE_URI } from '../constants/config'

export function connectorDetails({ githubSlug }, callback) {
  request.get(`${CONNECTOR_DETAIL_SERVICE_URI}/github/${githubSlug}`)
    .end((error, response) => {
      if (error) {
        callback(error)
        return
      }
      if (!response.ok) {
        callback(new Error('Unable to get Connector Details'))
        return
      }
      callback(null, response.body)
    })
}
