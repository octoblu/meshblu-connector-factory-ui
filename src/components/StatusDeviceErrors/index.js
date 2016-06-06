import React, { PropTypes, Component } from 'react';

import DebugLines from '../DebugLines'
import {
  Button,
} from 'zooid-ui';

import './index.css';

const propTypes = {
  statusDevice: PropTypes.object
};

const defaultProps = {
  statusDevice: {}
}

class StatusDeviceErrors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showErrors: false
    }
  }

  render(){
    const { statusDevice, children } = this.props
    if(_.isEmpty(statusDevice.errors)) {
      return null
    }
    return <DebugLines lines={statusDevice.errors}></DebugLines>
  }
};

StatusDeviceErrors.propTypes = propTypes;

export default StatusDeviceErrors;
