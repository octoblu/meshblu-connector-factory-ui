import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
  OctobluAppBar,
  TopBar,
  TopBarTitle,
} from 'zooid-ui';

import 'zooid-ui/dist/style.css';
import '../styles/App.css';

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default class App extends React.Component {
  render() {
    return (
      <div>
        <OctobluAppBar octobluUrl="https://app.octoblu.com" />
        <TopBar>
          <TopBarTitle>Meshblu Connector Factory</TopBarTitle>
          <Link className="TopBar--link" to="/">Home</Link>
          <Link className="TopBar--link" to="/things/installed">My Things</Link>
          <Link className="TopBar--link" to="/things/available">Available Things</Link>
        </TopBar>
        <div className="Container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
