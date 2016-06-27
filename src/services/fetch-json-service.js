import request from 'superagent';

export function getJSON({ uri }, callback) {
  request.get(uri)
    .end((error, response) => {
      if (error) {
        callback(error)
        return
      }
      if (!response.ok) {
        callback(new Error('Invalid Response'))
        return
      }
      const { body, text } = response
      let jsonResponse = body
      if (!body && text) {
        try {
          jsonResponse = JSON.parse(text)
        } catch (error) {
          callback(new Error('Unable to Parse JSON'))
          return
        }
      }
      callback(null, jsonResponse)
    })
}
