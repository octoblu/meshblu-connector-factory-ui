import './NodeTypes.css';
import _ from 'lodash'
import React, { PropTypes } from 'react';
import {Link} from 'react-router'

import {
  Button,
  Card,
  DeviceIcon
} from 'zooid-ui';

import classNames from 'classnames';

const NodeTypes = ({ nodeTypes, children, className }) => {
  const componentClass = classNames(
    'NodeTypes',
    className
  );

  let items = _.map(nodeTypes, (_nodeType) => {
    const { name, _id, type, connector } = _nodeType;

    return <Card key={_id} className="NodeType">
      <aside><DeviceIcon type={type} className="NodeType-icon" /></aside>
      <main className="NodeType-main">
        <div className="NodeType-body">
          <h3 className="NodeType-name">{name}</h3>
        </div>
        <footer className="NodeType-footer">
          <Link to={`/connectors/create/${connector}`} className="NodeType-button">Create</Link>
        </footer>
      </main>
    </Card>
  })

  return <div className={componentClass}>
    {items}
  </div>
};

NodeTypes.propTypes = {
  className: PropTypes.string,
  nodeTypes: PropTypes.array.isRequired
}

export default NodeTypes
