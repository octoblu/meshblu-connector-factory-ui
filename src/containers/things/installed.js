import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMyDevices } from '../../actions/things/device-actions'
import PageLayout from '../page-layout';
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
    this.props.dispatch(fetchMyDevices({ useBaseProps: true }))
  }

  render() {
    const { devices } = this.props;
    return (
      <PageLayout title="Installed Things" >
        <InstalledDevices devices={devices} />
      </PageLayout>
    );
  }
}

Installed.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ devices }) {
  return { devices: devices.items }
}

export default connect(mapStateToProps)(Installed)
