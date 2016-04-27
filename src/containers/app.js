import React, { PropTypes } from 'react';
import OctobluOauth from './octoblu-oauth';

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default class App extends React.Component {
  render() {
    return (
      <OctobluOauth>
        <h1>Meshblu Connector Factory</h1>
        {this.props.children}
      </OctobluOauth>
    );
  }
}

App.propTypes = propTypes;
