import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PageLayout from '../page-layout';

import { fetchAvailableNodes } from '../../actions/things/available-actions'

import NodeTypes from '../../components/NodeTypes';

class Available extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAvailableNodes());
  }

  render() {
    const { fetching, latest, legacy, error } = this.props;

    return (<PageLayout title="Available Things" loading={fetching} error={error}>
      <div>
        <h3>Compatible with the new Connector Installer</h3>
        <NodeTypes nodeTypes={latest} />
        <h3>Backwards compatible with Connector Installer</h3>
        <NodeTypes nodeTypes={legacy} />
      </div>
    </PageLayout>)
  }
}

Available.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ available }) {
  const { fetching, latest, legacy, error } = available
  return { fetching, latest, legacy, error }
}

export default connect(mapStateToProps)(Available)
