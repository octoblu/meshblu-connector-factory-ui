import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import _ from 'lodash';
import RegistryList from '../components/RegistryList';
import AppActions from '../components/AppActions';
import { EmptyState } from 'zooid-ui';
import ShortList from '../components/ShortList'
import InstalledDevices from '../components/InstalledDevices';
import { connect } from 'react-redux';
import { needsUpdate } from '../helpers/actions'
import { fetchMyDevices } from '../actions/things/device-actions'
import { setBreadcrumbs } from '../actions/page-actions'
import PageLayout from './page-layout'

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Connectors',
        link: '/',
      },
    ]))
    if (needsUpdate(this.props.devices)) {
      this.props.dispatch(fetchMyDevices({ useBaseProps: true }))
    }
  }

  render() {
    const { available, devices } = this.props;
    const devicesEmptyState = (
      <EmptyState
        className="Pretty--EmptyState"
        title="No connectors installed yet"
        cta="Create One"
        action={() => browserHistory.push('/connectors/available')}
      />
    )
    return (
      <PageLayout title="Connectors" actions={<AppActions />}>
        <ShortList
          title="Recently Installed Connectors"
          linkTo="/connectors/my"
          showEmptyState={_.isEmpty(devices.items)}
          emptyState={devicesEmptyState}
        >
          <InstalledDevices devices={devices.items} type="short" />
        </ShortList>
        <ShortList
          title="Top Connectors"
          linkTo="/connectors/available"
        >
          <RegistryList registries={available.registries} registryKey="octoblu-official" type="short" />
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
