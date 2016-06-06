import React, { Component } from 'react';
import { Link } from 'react-router';

import { getDevices } from '../services/device-service';
import PageLayout from './page-layout';

import InstalledDevices from '../components/InstalledDevices';

export default class Installed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      devices: [],
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    getDevices((error, devices)=>{
      this.setState({ error, devices, loading: false });
    });
  }

  render() {
    const { loading, error, devices } = this.state;
    return (
      <PageLayout title="Installed Things" loading={loading} error={error} >
        <InstalledDevices devices={devices} />
      </PageLayout>
    );
  }
}
