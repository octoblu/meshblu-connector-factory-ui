import _ from 'lodash';

export function getConnectorMetadata({ pkg }) {
  const { version, name } = pkg;
  const legacy = _.isEmpty(pkg.meshbluConnector);
  const connector = getConnectorName(name);

  const {
    githubSlug,
    connectorAssemblerVersion,
    dependencyManagerVersion,
  } = pkg.meshbluConnector;

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

export function getConnectorName(connector) {
  return connector.replace(/^meshblu\-(connector\-)*/, '');
}
