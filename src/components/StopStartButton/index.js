import React, { PropTypes } from 'react';

import FaStop from 'react-icons/lib/fa/stop';
import FaPlay from 'react-icons/lib/fa/play';

import {
  Button,
} from 'zooid-ui';

import './index.css';

const propTypes = {
  startAction: PropTypes.func.isRequired,
  stopAction: PropTypes.func.isRequired,
  stopped: PropTypes.bool.isRequired,
};

const StopStartButton = ({ startAction, stopAction, stopped }) => {
  if (stopped) {
    return <Button kind="hollow-approve" onClick={startAction}><FaPlay /></Button>
  }
  return <Button kind="hollow-danger" onClick={stopAction}><FaStop /></Button>
};

StopStartButton.propTypes = propTypes;

export default StopStartButton;
