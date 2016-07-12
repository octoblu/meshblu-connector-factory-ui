import React, { PropTypes } from 'react'

import FaStop from 'react-icons/lib/fa/stop'
import FaPlay from 'react-icons/lib/fa/play'

import {
  Button,
} from 'zooid-ui'

import './index.css'

const propTypes = {
  changeState: PropTypes.func.isRequired,
  stopped: PropTypes.bool.isRequired,
}

const StopStartButton = ({ changeState, stopped }) => {
  if (stopped) {
    return <Button kind="hollow-approve" onClick={() => { changeState({ stopped: false }) }}><FaPlay /></Button>
  }
  return <Button kind="hollow-danger" onClick={() => { changeState({ stopped: true }) }}><FaStop /></Button>
}

StopStartButton.propTypes = propTypes

export default StopStartButton
