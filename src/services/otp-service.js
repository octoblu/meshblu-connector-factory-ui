import request from 'superagent'

const OTP_SERVICE_URI = 'https://meshblu-otp.octoblu.com'

export function generateOtp({ uuid, token, metadata }, callback) {
  return request
    .post(`${OTP_SERVICE_URI}/generate`)
    .auth(uuid, token)
    .send(metadata)
    .end((error, response) => {
      if (error) return callback(error)
      if (!response.ok) return callback(new Error('Invalid Response'))

      return callback(null, response.body)
    })
}
