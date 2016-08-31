import request from 'superagent'
import {OTP_SERVICE_URI} from '../constants/config'

export function resolveOtp({ otp }, callback) {
  request
    .get(`${OTP_SERVICE_URI}/v2/passwords/${otp}`)
    .end((error, response) => {
      if (error) return callback(error)
      if (!response.ok) return callback(new Error('Invalid Response'))

      return callback(null, response.body)
    })
}

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
