import React, { PropTypes } from 'react'

import {
  Button,
  Card,
} from 'zooid-ui'

import VersionInfo from '../VersionInfo'

import './index.css'

const propTypes = {
  info: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const SelectedVersion = ({ info, onSelect }) => {
  const onSelectEvent = () => {
    onSelect(info)
  }
  return (
    <div className="SelectedVersion--container">
      <Card className="SelectedVersion">
        <main className="SelectedVersion-main">
          <div className="SelectedVersion-body">
            <VersionInfo info={info} />
            <Button className="SelectedVersion-button" onClick={onSelectEvent} kind="hollow-primary">Use this Version</Button>
          </div>
        </main>
      </Card>
    </div>
  )
}

SelectedVersion.propTypes = propTypes

export default SelectedVersion
