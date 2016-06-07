import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Toast from 'zooid-ui-toast';

import {
  AppBar,
  AppBarPrimary,
  AppBarSecondary,
} from 'zooid-ui';

import 'zooid-ui/dist/style.css';
import '../styles/the-app.css';

import { hasAuth } from '../helpers/authentication';

const propTypes = {
  children: PropTypes.element.isRequired,
};

class AppLayout extends Component {
  getLogout() {
    if(!hasAuth()) {
      return null
    }
    return <Link to="/logout" className="OctobluAppBar-link">Sign out</Link>
  }

  render() {
    const toast = null
    return (
      <div>
        <AppBar>
          <AppBarPrimary>
            <a className="OctobluAppBar-link OctobluAppBar-link--logo" href="https://app.octoblu.com">
              <img className="OctobluAppBar-logo" src="//d2zw6j512x6z0x.cloudfront.net/master/d48dc0bf063ecc1477d1163831ee8ff17efbbfae/assets/images/octoblu_logo.png"/>
            </a>

            <nav className="OctobluAppBar-nav OctobluAppBar-nav--primary" role="navigation">
              <a className="OctobluAppBar-link" href="/">Connector Factory</a>
            </nav>

          </AppBarPrimary>

          <AppBarSecondary>
            {this.getLogout()}
          </AppBarSecondary>
        </AppBar>
        <div className="Container">
          {this.props.children}
        </div>
        <Toast message={toast} timeout={30000} />
      </div>
    );
  }
}

AppLayout.propTypes = propTypes;

function mapStateToProps({ toast }) {
  return { toast }
}

export default connect(mapStateToProps)(AppLayout)
