import React, { PropTypes } from 'react';
import _  from 'lodash';

const propTypes = {
  device: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

import {
  DeviceConfigureSchemaContainer
} from 'zooid-meshblu-device-editor';

class DeviceSchema extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.device, nextProps.device)
  }

  render() {
    const { device, onSubmit } = this.props;
    return (<DeviceConfigureSchemaContainer
      device={device}
      onSubmit={onSubmit}
    />)
  }
}

DeviceSchema.propTypes = propTypes;

export default DeviceSchema;
