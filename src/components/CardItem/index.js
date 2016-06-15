import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Card,
  DeviceIcon,
} from 'zooid-ui';

import './index.css';

const propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  iconType: PropTypes.string,
};

const getDeviceIcon = ({ iconType }) => {
  if (!iconType) return null
  return (
    <aside>
      <DeviceIcon type={iconType} className="CardItem-icon" />
    </aside>
  )
}

const CardItem = ({ title, linkTo, linkTitle, iconType }) => {
  return (
    <div className="CardItem--container">
      <Card className="CardItem">
        {getDeviceIcon({ iconType })}
        <main className="CardItem-main">
          <div className="CardItem-body">
            <div className="CardItem-name">
              {title}
            </div>
          </div>
          <footer className="CardItem-footer">
            <Link className="CardItem-button" to={linkTo}>{linkTitle}</Link>
          </footer>
        </main>
      </Card>
    </div>
  );
};

CardItem.propTypes = propTypes;

export default CardItem;
