import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import {
  Page,
  PageHeader,
  PageActions,
  PageTitle,
  Spinner,
  ErrorState,
  EmptyState,
  Button,
  Form,
  FormActions,
  FormField,
  FormInput,
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
    this.handleNameChange  = this.handleNameChange.bind(this);
    this.sendPingAndUpdate  = this.sendPingAndUpdate.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    getDevice({ uuid }, (error, device) => {
      this.setState({ error, device, lastPong: device.lastPong, loading: false });
      this.sendPingAndUpdate({ uuid })
    });
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

  handleNameChange() {
    const ref = this.refs.deviceName;
    const deviceName = ReactDOM.findDOMNode(ref).value;
    this.handleConfig({ name: deviceName });
  }

  getStatusInfo() {
    const { lastPong } = this.state;
    if (!lastPong) {
      const { online } = this.state.device;
      if (online) {
        return { statusText: 'device is online', online: true }
      } else {
        return { statusText: 'device is offline', online: false }
      }
    }
    const { date, response } = lastPong;
    const { running } = response;
    const oneMinAgo = Date.now() - (1000 * 60);
    if(date > oneMinAgo) {
      if(running) {
        return { statusText: 'device is responding to pings', online: true }
      }
    }
    return { statusText: 'device may be unavailable', online: false }
  }

  getStatus() {
    if(!this.state.device) return null;
    const { statusText, online } = this.getStatusInfo()
    if (online) {
      return <Button kind="hollow-primary">{statusText}</Button>;
    }
    return <Button kind="hollow-danger">{statusText}</Button>;
  }

  renderContent(content) {
    const { connector } = this.props.params;
    return (
      <Page>
        <PageHeader>
          <PageTitle>Configure Device</PageTitle>
          <PageActions>{this.getStatus()}</PageActions>
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

    const getSchema = () => {
      const schema = _.get(device, 'device.schema.configure') || _.get(device, 'device.optionsSchema');
      if(_.isEmpty(schema)) {
        return <EmptyState title="[ No Schema ]"></EmptyState>
      }
      return <SchemaContainer
        device={device}
        schema={schema}
        onSubmit={this.handleConfig}
      />
    }

    return this.renderContent(
      <div>
        <FormField label="Device Name" name="deviceName">
          <FormInput type="text" ref="deviceName" name="deviceName" defaultValue={device.name} />
        </FormField>
        <FormActions>
          <Button onClick={this.handleNameChange} kind="primary">Change Name</Button>
        </FormActions>
        {getSchema()}
        <h4>{message}</h4>
      </div>
    );
  }
}
