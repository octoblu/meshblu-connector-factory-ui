import _ from 'lodash'
import React, { PropTypes } from 'react';

import CardItem from '../CardItem'
import './index.css';
import classNames from 'classnames';

const NodeTypes = ({ nodeTypes, className }) => {
  const componentClass = classNames(
    'NodeTypes',
    'CardItemList',
    className
  );

  let items = _.map(nodeTypes, (_nodeType) => {
    const { name, _id, type, connector } = _nodeType;
    return (
      <CardItem
        key={_id}
        title={name}
        iconType={type}
        linkTo={`/connectors/create/${connector}`}
        linkTitle="Create"
      />
    )
  })

  return (<div className={componentClass}>
    {items}
  </div>)
};

NodeTypes.propTypes = {
  className: PropTypes.string,
  nodeTypes: PropTypes.array.isRequired,
}

export default NodeTypes
