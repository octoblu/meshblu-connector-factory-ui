import React, { PropTypes } from 'react';
import _  from 'lodash';

import {
  Button,
  Card,
  DeviceIcon,
} from 'zooid-ui';

import VersionInfo from '../VersionInfo';

import './SelectedVersion.css';

const propTypes = {
  info: PropTypes.object.isRequired,
  type: PropTypes.string,
  createDevice: PropTypes.func.isRequired,
};

const SelectedVersion = ({ info, type, createDevice }) => {
  let title = "Selected"
  if (info.latest) {
    title = "Latest Version"
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
            <Button onClick={createDevice} className="SelectedVersion-button">Create</Button>
          </footer>
        </main>
      </Card>
    </div>
  );
};

SelectedVersion.propTypes = propTypes;

export default SelectedVersion;
