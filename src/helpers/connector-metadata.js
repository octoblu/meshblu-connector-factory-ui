import _ from 'lodash';
import { getAllLatestVersions } from '../services/go-version-service';

export function getConnectorName(connector) {
  return connector.replace(/^meshblu\-(connector\-)/, '');
}

export function getFriendlyName(connector) {
  const name = getConnectorName(connector)
  return `Connector ${_.startCase(name)}`;
}

export function getConnectorMetadata({ connector, githubSlug, version, octoblu }, callback) {
  const connectorName = getConnectorName(connector);
  const betterVersion = version.replace('v', '');
  const tag = `v${betterVersion}`;

  getAllLatestVersions((error, versions) => {
    if (error != null) return callback(error)
    const {
      ignitionVersion,
      dependencyManagerVersion,
      connectorAssemblerVersion,
    } = versions;

    callback(null, {
      legacy: false,
      connector: connectorName,
      tag,
      githubSlug,
      connectorAssemblerVersion,
      dependencyManagerVersion,
      ignitionVersion,
      octoblu,
    })
  })
}
