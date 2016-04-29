import _ from 'lodash';

export function getConnectorMetadata({ pkg }) {
  const { version, name } = pkg;
  const connector = getConnectorName(name);
  const legacy = _.isEmpty(pkg.meshbluConnector);
  let metadata = getLegacyMetadata({ pkg });

  if (!legacy) {
    metadata = getNewMetadata({ pkg });
  }

  const {
    githubSlug,
    connectorAssemblerVersion,
    dependencyManagerVersion,
  } = metadata;

  const tag = `v${version}`;

  return {
    legacy,
    connector,
    tag,
    githubSlug,
    connectorAssemblerVersion,
    dependencyManagerVersion,
  };
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
