import _ from 'lodash'
import React, { PropTypes } from 'react';

import CardItem from '../CardItem'
import './index.css';
import classNames from 'classnames';

function getRegistryCards(items) {
  return _.map(items, (item) => {
    const { _id, name, description, type, githubSlug } = item;
    let shortDescription = _.truncate(description, { length: 100 })
    return (
      <CardItem
        key={_id}
        title={name}
        description={shortDescription}
        iconType={type}
        linkTo={`/connectors/create/${githubSlug}`}
        linkTitle="Create"
      />
    )
  })
}

function getHeader({ name, version }) {
  return <h4>{name} <small>v{version}</small></h4>
}

function renderList({ registry, key, type }) {
  let { items } = registry
  const { name, version } = registry

  if (_.isEmpty(items)) {
    return null
  }

  if (type && type === 'short') {
    items = _.slice(items || [], 0, 6)
  }

  return (
    <div key={key} className="RegistryList--section">
      <header>{getHeader({ name, version })}</header>
      <main className="CardItemList">{getRegistryCards(items)}</main>
    </div>
  )
}

const RegistryList = ({ registries = {}, registryKey, type, className }) => {
  const componentClass = classNames(
    'RegistryList',
    className
  );

  let registryList = []
  if (registryKey) {
    const registry = registries[registryKey] || {}
    registryList.push(renderList({ registryKey, registry, type }))
  } else {
    registryList = _.map(registries, (registry, registryKey) => {
      return renderList({ registryKey, registry, type })
    })
  }

  return (
    <div className={componentClass}>
      {registryList}
    </div>
  )
};

RegistryList.propTypes = {
  className: PropTypes.string,
  registries: PropTypes.object.isRequired,
  registryKey: PropTypes.string,
  type: PropTypes.string,
}

RegistryList.defaultProps = {
  type: 'long',
}

export default RegistryList
