import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router'
import _ from 'lodash';
import NodeTypes from '../components/NodeTypes';
import { EmptyState } from 'zooid-ui';
import ShortList from './short-list'
import InstalledDevices from '../components/InstalledDevices';
import { connect } from 'react-redux';
import { fetchAvailableNodes } from '../actions/things/available-actions'
import { fetchMyDevices } from '../actions/things/device-actions'
import { setBreadcrumbs } from '../actions/page-actions'
import PageLayout from './page-layout'

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Home',
        link: '/',
      },
    ]))
    this.props.dispatch(fetchAvailableNodes());
    this.props.dispatch(fetchMyDevices({ useBaseProps: true }))
  }

  getActions() {
    return (
      <ul>
        <li><Link to="/things/my" className="Button Button--hollow-primary">My Things</Link></li>
        <li><Link to="/things/all" className="Button Button--hollow-primary">All Things</Link></li>
        <li><Link to="/getting-started" className="Button Button--hollow-primary">Getting Started</Link></li>
      </ul>
    )
  }

  render() {
    const { latest, devices } = this.props;
    const devicesEmptyState = (
      <EmptyState
        className="Pretty--EmptyState"
        title="No connectors installed yet"
        cta="Create One"
        action={() => browserHistory.push('/things/all')}
      />
    )
    return (
      <PageLayout title="Dashboard" actions={this.getActions()}>
        <div>
          <ShortList
            title="Recently Installed Connectors"
            linkTo="/things/all"
            showEmptyState={_.isEmpty(devices)}
            emptyState={devicesEmptyState}
          >
            <InstalledDevices devices={_.slice(devices, 0, 6)} />
          </ShortList>
          <ShortList
            title="Top Connectors"
            linkTo="/things/all"
          >
            <NodeTypes nodeTypes={_.slice(latest, 0, 6)} />
          </ShortList>
        </div>
      </PageLayout>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ available, devices }) {
  const { latest } = available
  return { latest, devices: devices.items }
}

export default connect(mapStateToProps)(Home)
