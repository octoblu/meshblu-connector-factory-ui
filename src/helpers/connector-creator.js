import { getSchema } from '../services/schema-service';
import { registerConnector } from '../services/device-service';
import { generateOtp } from '../services/otp-service';
import { getConnectorMetadata } from '../helpers/connector-metadata';

export function createConnector({ pkg, connector }, callback) {
  getSchema({ pkg }, (error, schema) => {
    if (error) return callback(error);
    registerConnector({ connector, customProps: schema }, (error, device) => {
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
