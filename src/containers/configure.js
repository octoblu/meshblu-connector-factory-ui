import React, { Component } from 'react';
import _ from 'lodash';
import {
  Page,
  PageHeader,
  PageTitle,
  Spinner,
  ErrorState,
  Button,
} from 'zooid-ui';

import { SchemaContainer } from 'zooid-meshblu-device-editor';

import {
  getDevice,
  updateDevice,
  sendPing,
} from '../services/device-service';

export default class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      device: null,
      loading: true,
      lastPong: null,
      message: null
    };
    this.handleConfig  = this.handleConfig.bind(this);
    this.sendPingAndUpdate  = this.sendPingAndUpdate.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    getDevice({ uuid }, (error, device) => {
      this.setState({ error, device, lastPong: device.lastPong, loading: false });
    });
    this.sendPingAndUpdate({ uuid })
  }

  sendPingAndUpdate({ uuid }) {
    console.log('sending ping');
    sendPing({ uuid }, (error) => {
      if (error) return;
      _.delay(() => {
        getDevice({uuid}, (error, device) => {
          if(error) return;
          const { lastPong } = device;
          this.setState({ lastPong })
          _.delay(this.sendPingAndUpdate, 5000, { uuid });
        })
      }, 2000);
    });
  }

  handleConfig(properties) {
    const { uuid } = this.props.params;
    clearTimeout(this.messageTimeout);
    updateDevice({ uuid, properties }, (error) => {
      if (error) {
        this.setState({ error });
        return;
      }
      const { device } = this.state;
      this.setState({ message: 'Device Updated', device: _.assign({}, device, properties) });
      this.messageTimeout = setTimeout(() => {
        this.setState({ message: null });
      }, 5000)
    })
  }

  getStatus({ lastPong }) {
    const { date, response } = lastPong;
    const { running } = response;
    const oneMinAgo = Date.now() - (1000 * 60);
    if(date > oneMinAgo) {
      if(running) {
        return `device is responding to pings`
      }
    }
    return 'device may be unavailable'
  }

  renderContent(content) {
    const { connector } = this.props.params;
    return (
      <Page>
        <PageHeader>
          <PageTitle>Configure Device</PageTitle>
        </PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const { device, lastPong, loading, error, message } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }

    if (loading) {
      return this.renderContent(<Spinner size="large" />);
    }

    let messageEl = '';
    if (message) {
      messageEl = <h4>{message}</h4>;
    }

    const status = this.getStatus({ lastPong });

    return this.renderContent(
      <div>
        <h2><strong>Device Status:</strong> {status}</h2>
        <SchemaContainer
          device={device}
          schema={device.schemas.configure}
          onSubmit={this.handleConfig}
        />
        {messageEl}
      </div>
    );
  }
}
