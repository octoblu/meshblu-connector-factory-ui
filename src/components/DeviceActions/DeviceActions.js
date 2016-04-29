import './DeviceActions.css';
import React, { PropTypes } from 'react';
import { Button } from 'zooid-ui'

import MdStop from 'react-icons/lib/md/stop';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdDelete from 'react-icons/lib/md/delete';

import classNames from 'classnames';

const renderButtons = (buttons) => {
  if (buttons) return buttons
  return null
}

const DeviceActions = ({ buttons, device, onStart, onStop, onDelete, children, className }) => {
  const componentClass = classNames(
    'DeviceActions',
    className
  );

  let playButtonType = 'hollow-approve'
  let stopButtonType = 'hollow-neutral'
  if(device.gateblu) {
    if(device.gateblu.running){
      playButtonType = 'approve'
    }else{
      stopButtonType = 'neutral'
    }
  }

  return <div className={componentClass}>
    <Button className="DeviceActions--action" kind={stopButtonType} onClick={onStop}><MdStop /></Button>
    <Button className="DeviceActions--action" kind={playButtonType} onClick={onStart}><MdPlayArrow /></Button>
    <Button className="DeviceActions--action" kind="hollow-danger" onClick={onDelete}><MdDelete /></Button>
    {renderButtons(buttons)}
  </div>
};

DeviceActions.propTypes = {
  buttons: PropTypes.node,
  className: PropTypes.string,
  device: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
}

export default DeviceActions
