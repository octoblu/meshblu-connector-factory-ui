import React, { Component, PropTypes } from 'react';
import AppActions from '../../components/AppActions';
import { connect } from 'react-redux';
import { fetchMyDevices } from '../../actions/things/device-actions'
import PageLayout from '../page-layout';
import { needsUpdate } from '../../helpers/actions'
import { setBreadcrumbs } from '../../actions/page-actions'

import InstalledDevices from '../../components/InstalledDevices';

class Installed extends Component {
  componentDidMount() {
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'My Things',
      },
    ]))
    if (needsUpdate(this.props.devices)) {
      this.props.dispatch(fetchMyDevices({ useBaseProps: true }))
    }
  }

  render() {
    const { devices } = this.props;
    return (
      <PageLayout title="My Things" actions={<AppActions />} >
        <InstalledDevices devices={devices.items} />
      </PageLayout>
    );
  }
}

Installed.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ devices }) {
  return { devices }
}

export default connect(mapStateToProps)(Installed)
