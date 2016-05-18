import _ from 'lodash';
import { getAllLatestVersions } from '../services/go-version-service';

export function getConnectorMetadata({ pkg }, callback) {
  const { version, name } = pkg;
  const connector = getConnectorName(name);
  const legacy = _.isEmpty(pkg.meshbluConnector);
  let metadata = getLegacyMetadata({ pkg });

  if (!legacy) {
    metadata = getNewMetadata({ pkg });
  }

  let {
    githubSlug,
    connectorAssemblerVersion,
    dependencyManagerVersion,
    ignitionVersion,
  } = metadata;

  const tag = `v${version}`;

  getAllLatestVersions((error, versions) => {
    console.log({ error, versions })
    if(error != null) return callback(error)
    if(ignitionVersion == null) {
      ignitionVersion = versions.ignitionVersion;
    }
    if(dependencyManagerVersion == null) {
      dependencyManagerVersion = versions.dependencyManagerVersion;
    }
    if(connectorAssemblerVersion == null) {
      connectorAssemblerVersion = versions.connectorAssemblerVersion;
    }
    callback(null, {
      legacy,
      connector,
      tag,
      githubSlug,
      connectorAssemblerVersion,
      dependencyManagerVersion,
      ignitionVersion,
    })
  })
}

function getLegacyMetadata({ pkg }) {
  return {
    githubSlug: `octoblu/${pkg.name}`
  };
}

function getNewMetadata({ pkg }) {
  return pkg.meshbluConnector;
}


export function getConnectorName(connector) {
  return connector.replace(/^meshblu\-(connector\-)*/, '');
}
