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

import {
  SchemaContainer,
} from 'zooid-meshblu-device-editor';

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
      online: false,
      message: null
    };
    this.handleConfig  = this.handleConfig.bind(this);
    this.handleNameChange  = this.handleNameChange.bind(this);
    this.sendPingAndUpdate  = this.sendPingAndUpdate.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    getDevice({ uuid }, (error, device) => {
      this.setState({ error, device, online: device.online, lastPong: device.lastPong, loading: false });
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
          const { lastPong, online } = device;
          this.setState({ lastPong, online })
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

    if (lastPong) {
      const { date, response } = lastPong;
      const { running } = response;
      const oneMinAgo = Date.now() - (1000 * 60);
      if(date > oneMinAgo) {
        if(running) {
          return { statusText: 'connector is responding to pings', online: true }
        }
      }
    }
    const { online } = this.state;
    if (online) {
      return { statusText: 'thing is online', online: true }
    }
    return { statusText: 'thing is offline', online: false }
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
          <PageTitle>Configure Thing</PageTitle>
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

    const getDeviceSchema = () => {
      const schema = _.get(device, 'schemas.configure') || _.get(device, 'optionsSchema');
      if(_.isEmpty(schema)) {
        return <EmptyState title="[ No Device Schema ]"></EmptyState>
      }
      return  <SchemaContainer
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
        {getDeviceSchema()}
        <h4>{message}</h4>
      </div>
    );
  }
}
