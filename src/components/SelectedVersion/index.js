import React, { PropTypes } from 'react';

import {
  Button,
  Card,
} from 'zooid-ui';

import VersionInfo from '../VersionInfo';

import './index.css';

const propTypes = {
  info: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const SelectedVersion = ({ info, onSelect }) => {
  let title = 'Selected'
  if (info.latest) {
    title = 'Latest Version'
  }
  const onSelectEvent = () => {
    onSelect(info)
  }
  return (
    <div className="SelectedVersion--container">
      <Card className="SelectedVersion">
        <main className="SelectedVersion-main">
          <div className="SelectedVersion-body">
            <div className="SelectedVersion-name">
              <h3>{title}</h3>
              <VersionInfo info={info} />
            </div>
          </div>
          <footer className="SelectedVersion-footer">
            <Button onClick={onSelectEvent} className="SelectedVersion-button">Select Version</Button>
          </footer>
        </main>
      </Card>
    </div>
  );
};

SelectedVersion.propTypes = propTypes;

export default SelectedVersion;
