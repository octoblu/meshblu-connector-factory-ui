import _ from 'lodash';
import { getSchema } from '../services/schema-service';
import {
  updateDevice,
  registerConnector,
  generateAndStoreToken
} from '../services/device-service';

import { generateOtp } from '../services/otp-service';
import { getConnectorMetadata } from '../helpers/connector-metadata';

export function createConnector({ pkg, connector }, callback) {
  getSchema({ pkg }, (error, schema) => {
    if (error) return callback(error);
    const connectorOptions = {
      connector,
      version: pkg.version,
      customProps: schema
    }
    registerConnector(connectorOptions, (error, device) => {
      if (error) return callback(error);
      const { uuid, token } = device;
      const metadata = getConnectorMetadata({ pkg });

      generateOtp({ uuid, token, metadata  }, (error, response) => {
        if (error) return callback(error);
        const { key } = response;
        return callback(null, { key, uuid });
      });
    })
  });
}

export function updateAndGenerateKey({ pkg, connector, uuid }, callback) {
  getSchema({ pkg }, (error, schema) => {
    if (error) return callback(error);
    const properties = _.assign({
      connector: connector,
      connectorMetadata: {
        stopped: false,
        version: pkg.version,
      }
    }, schema);
    updateDevice({ uuid, properties }, (error) => {
      if (error) return callback(error);
      generateAndStoreToken({ uuid }, (error, device) => {
        const { uuid, token } = device;
        const metadata = getConnectorMetadata({ pkg });
        generateOtp({ uuid, token, metadata  }, (error, response) => {
          if (error) return callback(error);
          const { key } = response;
          return callback(null, { key, uuid });
        });
      })
    })
  });
}
