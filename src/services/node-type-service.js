import _ from 'lodash';
import request from 'superagent';
import { getMeshbluConfig } from '../helpers/authentication';
import { newConnectors } from '../assets/new-connectors';
const OCTOBLU_URL = 'https://api.octoblu.com';

export function getAvailableNodeTypes(callback){
  const {uuid, token} = getMeshbluConfig()
  request
    .get(`${OCTOBLU_URL}/api/node_types`)
    .auth(uuid, token)
    .end((error, response) => {
      if(!response.ok) return callback(new Error('Unable to fetch connectors'))
      if(_.isEmpty(response.body)) return callback()
      let connectors = _.filter(response.body, {category:'device'})
      connectors = _.filter(connectors, (connector) => {
        if(connector.connector) return true
        return false
      })
      callback(null, { old: connectors, new: newConnectors })
    })
}

export function getNodeType({ connector }, callback){
  getAvailableNodeTypes((error, connectors) => {
    callback(error, _.find(connectors, { connector }))
  })
}
