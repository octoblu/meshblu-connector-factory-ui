import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchMyDevices } from '../../actions/things/devices-actions'
import PageLayout from '../page-layout';

import InstalledDevices from '../../components/InstalledDevices';

 class Installed extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchMyDevices())
  }

  render() {
    const { fetching, error, devices } = this.props;
    return (
      <PageLayout title="Installed Things" loading={fetching} error={error} >
        <InstalledDevices devices={devices} />
      </PageLayout>
    );
  }
}

Installed.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps({ devices }) {
  const { fetching, items, error } = devices
  return { fetching, devices: items, error }
}

export default connect(mapStateToProps)(Installed)
