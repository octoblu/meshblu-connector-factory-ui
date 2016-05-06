import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _  from 'lodash';

import {
  Card,
  DeviceIcon,
} from 'zooid-ui';

import './ConfigureCard.css';

const propTypes = {
  uuid: PropTypes.string.isRequired,
};

const ConfigureCard = ({ uuid }) => {
  return (
    <div className="ConfigureCard--container">
      <Card className="ConfigureCard">
        <main className="ConfigureCard-main">
          <div className="ConfigureCard-body">
            <div className="ConfigureCard-name">
              <h3>Next Step</h3>
            </div>
          </div>
          <footer className="ConfigureCard-footer">
            <Link className="ConfigureCard-button Button Button--hollow-approve" to={`/things/configure/${uuid}`}>Configure Thing</Link>
          </footer>
        </main>
      </Card>
    </div>
  );
};

ConfigureCard.propTypes = propTypes;

export default ConfigureCard;
