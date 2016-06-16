import React, { Component, PropTypes } from 'react';
import AppActions from '../../components/AppActions';
import { connect } from 'react-redux';
import PageLayout from '../page-layout';
import { setBreadcrumbs } from '../../actions/page-actions'

import { fetchAvailableNodes } from '../../actions/things/available-actions'
import { needsUpdate } from '../../helpers/actions'

import NodeTypes from '../../components/NodeTypes';

class Available extends Component {
  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Dashboard',
        link: '/',
      },
      {
        label: 'All Things',
      },
    ]))
    if (needsUpdate(this.props.available)) {
      this.props.dispatch(fetchAvailableNodes());
    }
  }

  render() {
    const { latest, legacy } = this.props.available;

    return (<PageLayout title="All Things" actions={<AppActions />}>
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
  return { available }
}

export default connect(mapStateToProps)(Available)
