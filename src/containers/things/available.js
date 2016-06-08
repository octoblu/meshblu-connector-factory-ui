import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PageLayout from '../page-layout';
import { setBreadcrumbs } from '../../actions/page-actions'

import { fetchAvailableNodes } from '../../actions/things/available-actions'

import NodeTypes from '../../components/NodeTypes';

class Available extends Component {
  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'All Things',
      },
    ]))
    this.props.dispatch(fetchAvailableNodes());
  }

  render() {
    const { latest, legacy } = this.props;

    return (<PageLayout title="Available Things">
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
  const { latest, legacy } = available
  return { latest, legacy }
}

export default connect(mapStateToProps)(Available)
