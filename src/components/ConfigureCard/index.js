import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card } from 'zooid-ui';

import './index.css'

const propTypes = {
  uuid: PropTypes.string.isRequired,
};

const ConfigureCard = ({ uuid }) => {
  return (
    <Card className="ConfigureCard">
      <main className="ConfigureCard-main">
        <div className="ConfigureCard-body">
          <h3>Next Step</h3>
          <Link className="ConfigureCard-button Button Button--hollow-approve" to={`/connectors/configure/${uuid}`}>Configure Thing</Link>
        </div>
      </main>
    </Card>
  );
};

ConfigureCard.propTypes = propTypes;

export default ConfigureCard;
