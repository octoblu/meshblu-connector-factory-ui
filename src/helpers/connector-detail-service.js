import request from 'superagent'

const CONNECTOR_SERVICE_URI = 'https://connector.octoblu.com'

export default class ConnectorDetailService {
  constructor() {

  }

  details(connector, callback) {
    request
      .get(`${CONNECTOR_SERVICE_URI}/${connector}`)
      .end((error, response) => {
        if (error) return callback(error)
        if (!response.ok) return callback(new Error('Invalid Response'))

        callback(null, response.body)
      })
  }
}
