import './Connectors.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import {Link} from 'react-router'

import {
  Button,
  Card,
  DeviceIcon
} from 'zooid-ui';

import classNames from 'classnames';

const Connectors = ({ connectors, children, className }) => {
  const componentClass = classNames(
    'Connectors',
    className
  );

  let items = _.map(connectors, (_connector) => {
    const { name, _id, type, connector } = _connector;

    return <Card key={_id} className="Connector">
      <aside><DeviceIcon type={type} className="Connector-icon" /></aside>
      <main className="Connector-main">
        <div className="Connector-body">
          <h3 className="Connector-name">{name}</h3>
        </div>
        <footer className="Connector-footer">
          <Link to={`/connectors/create/${connector}`} className="Connector-button">Create</Link>
        </footer>
      </main>
    </Card>
  })

  return <div className={componentClass}>
    {items}
  </div>
};

Connectors.propTypes = {
  className: PropTypes.string,
  connectors: PropTypes.array.isRequired
}

export default Connectors
