import { getAllLatestVersions } from '../services/go-version-service';

export function getConnectorName(connector) {
  return connector.replace(/^meshblu\-(connector\-)/, '');
}

function getNewMetadata({ pkg }) {
  return pkg.meshbluConnector;
}

export function getConnectorMetadata({ pkg, octoblu }, callback) {
  const { version, name } = pkg;
  const connector = getConnectorName(name);
  const metadata = getNewMetadata({ pkg });

  const { githubSlug } = metadata;
  let {
    connectorAssemblerVersion,
    dependencyManagerVersion,
    ignitionVersion,
  } = metadata;

  const tag = `v${version}`;

  getAllLatestVersions((error, versions) => {
    if (error != null) return callback(error)
    if (!ignitionVersion) {
      ignitionVersion = versions.ignitionVersion;
    }
    if (!dependencyManagerVersion) {
      dependencyManagerVersion = versions.dependencyManagerVersion;
    }
    if (!connectorAssemblerVersion) {
      connectorAssemblerVersion = versions.connectorAssemblerVersion;
    }
    callback(null, {
      legacy: false,
      connector,
      tag,
      githubSlug,
      connectorAssemblerVersion,
      dependencyManagerVersion,
      ignitionVersion,
      octoblu,
    })
  })
}
