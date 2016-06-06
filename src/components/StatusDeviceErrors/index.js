import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import DebugLines from '../DebugLines'
import {
  Button,
} from 'zooid-ui';

import './index.css';

const propTypes = {
  statusDevice: PropTypes.object,
  clearErrors: PropTypes.func,
};

const defaultProps = {
  statusDevice: {},
  clearErrors: _.noop,
}

class StatusDeviceErrors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showErrors: false
    }
  }

  render(){
    const { statusDevice, clearErrors } = this.props
    if(_.isEmpty(statusDevice.errors)) {
      return null
    }

    let title = 'Errors'
    if(statusDevice.updateErrorsAt) {
      const date = moment(statusDevice.updateErrorsAt).fromNow()
      title = `Errors from ${date}`
    }

    return (
      <div>
        <div className="CenterIt">
          <Button kind="primary" onClick={clearErrors}>Clear Errors</Button>
        </div>
        <DebugLines lines={statusDevice.errors} title={title}></DebugLines>
      </div>
    )
  }
};

StatusDeviceErrors.propTypes = propTypes;

export default StatusDeviceErrors;
