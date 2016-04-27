import React, { PropTypes } from 'react';
import OctobluOauth from './octoblu-oauth';
import { OctobluAppBar } from 'zooid-ui';

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default class App extends React.Component {
  render() {
    return (
      <OctobluOauth>
        <OctobluAppBar octobluUrl="https://app.octoblu.com"/>
        {this.props.children}
      </OctobluOauth>
    );
  }
}

App.propTypes = propTypes;
