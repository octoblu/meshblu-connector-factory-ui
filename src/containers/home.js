import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import _ from 'lodash';
import NodeTypes from '../components/NodeTypes';
import AppActions from '../components/AppActions';
import { EmptyState } from 'zooid-ui';
import ShortList from './short-list'
import InstalledDevices from '../components/InstalledDevices';
import { connect } from 'react-redux';
import { needsUpdate } from '../helpers/actions'
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
    if (needsUpdate(this.props.devices)) {
      this.props.dispatch(fetchMyDevices({ useBaseProps: true }))
    }
    if (needsUpdate(this.props.devices)) {
      this.props.dispatch(fetchAvailableNodes())
    }
  }

  render() {
    const { available, devices } = this.props;
    const devicesEmptyState = (
      <EmptyState
        className="Pretty--EmptyState"
        title="No connectors installed yet"
        cta="Create One"
        action={() => browserHistory.push('/things/all')}
      />
    )
    return (
      <PageLayout title="Dashboard" actions={<AppActions />}>
        <ShortList
          title="Recently Installed Connectors"
          linkTo="/things/all"
          showEmptyState={_.isEmpty(devices.items)}
          emptyState={devicesEmptyState}
        >
          <InstalledDevices devices={_.slice(devices.items, 0, 6)} />
        </ShortList>
        <ShortList
          title="Top Connectors"
          linkTo="/things/all"
        >
          <NodeTypes nodeTypes={_.slice(available.latest, 0, 6)} />
        </ShortList>
      </PageLayout>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ available, devices }) {
  return { available, devices }
}

export default connect(mapStateToProps)(Home)
