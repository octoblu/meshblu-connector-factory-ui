import _ from 'lodash'

export function getConnectorName(connector) {
  return connector.replace(/^meshblu-(connector-)/, '')
}

export function getFriendlyName(connector) {
  const name = getConnectorName(connector)
  return `Connector ${_.startCase(name)}`
}
