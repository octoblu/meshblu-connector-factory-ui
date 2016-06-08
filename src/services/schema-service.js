import request from 'superagent';
import _ from 'lodash';

export function getSchema({ pkg }, callback) {
  if (!_.get(pkg, 'meshbluConnector.schemasUrl')) {
    callback(null, {});
    return
  }
  const { schemasUrl } = pkg.meshbluConnector;
  request
    .get(schemasUrl)
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
