import _ from 'lodash';
import { getSchema } from '../services/schema-service';
import {
  updateDevice,
  registerConnector,
  generateAndStoreToken,
} from '../services/device-service';

import { generateOtp } from '../services/otp-service';
import { getConnectorMetadata } from '../helpers/connector-metadata';

export function createConnector({ githubSlug, version, connector, octoblu }, callback) {
  getSchema({ githubSlug, version }, (error, schema) => {
    if (error) return callback(error);
    const connectorOptions = {
      connector,
      version,
      githubSlug,
      customProps: _.assign({ name: _.startCase(connector) }, schema),
    }
    registerConnector(connectorOptions, (error, device) => {
      if (error) return callback(error);
      const { uuid, token } = device;
      getConnectorMetadata({ connector, githubSlug, version, octoblu }, (error, metadata) => {
        if (error != null) return callback(error);
        generateOtp({ uuid, token, metadata }, (error, response) => {
          if (error != null) return callback(error);
          const { key } = response;
          return callback(null, { key, uuid });
        });
      });
    })
  });
}

export function updateAndGenerateKey({ uuid, githubSlug, version, connector, octoblu }, callback) {
  getSchema({ githubSlug, version }, (error, schema) => {
    if (error) return callback(error);
    const properties = _.assign({
      connector,
      connectorMetadata: {
        stopped: false,
        githubSlug,
        version,
      },
    }, schema);
    updateDevice({ uuid, properties }, (error) => {
      if (error != null) return callback(error);
      generateAndStoreToken({ uuid }, (error, device) => {
        if (error != null) return callback(error);
        const { uuid, token } = device;
        getConnectorMetadata({ connector, githubSlug, version, octoblu }, (error, metadata) => {
          if (error != null) return callback(error);
          generateOtp({ uuid, token, metadata  }, (error, response) => {
            if (error != null) return callback(error);
            const { key } = response;
            return callback(null, { key, uuid });
          });
        });
      })
    })
  });
}
