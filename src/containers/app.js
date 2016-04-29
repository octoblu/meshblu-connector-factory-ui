import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import OctobluOauth from './octoblu-oauth';
import {
  OctobluAppBar,
  TopBar,
  TopBarTitle,
} from 'zooid-ui';

import 'zooid-ui/dist/style.css';
import '../styles/style.css';

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default class App extends React.Component {
  render() {
    return (
      <OctobluOauth>
        <OctobluAppBar octobluUrl="https://app.octoblu.com" />
        <TopBar>
          <TopBarTitle>Meshblu Connector Factory</TopBarTitle>
          <Link className="TopBar--link" to="/connectors/installed">My Connectors</Link>
          <Link className="TopBar--link" to="/connectors/available">Available Connectors</Link>
        </TopBar>
        {this.props.children}
      </OctobluOauth>
    );
  }
}

App.propTypes = propTypes;
