import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceIcon from 'zooid-device-icon'

import { Card } from 'zooid-ui'

import './index.css'

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  iconType: PropTypes.string,
}

const getDeviceIcon = ({ iconType }) => {
  if (!iconType) return null
  return (
    <aside className="CardItem-side">
      <DeviceIcon type={iconType} />
    </aside>
  )
}

const CardItem = ({ title, description, linkTo, linkTitle, iconType }) => {
  return (
    <div className="CardItem--container">
      <Card className="CardItem">
        {getDeviceIcon({ iconType })}
        <main className="CardItem-main">
          <div className="CardItem-body">
            <div className="CardItem-title">
              {title}
            </div>
            <div className="CardItem-description">
              {description}
            </div>
          </div>
          <footer className="CardItem-footer">
            <Link className="CardItem-action" to={linkTo}>{linkTitle}</Link>
          </footer>
        </main>
      </Card>
    </div>
  )
}

CardItem.propTypes = propTypes

export default CardItem
