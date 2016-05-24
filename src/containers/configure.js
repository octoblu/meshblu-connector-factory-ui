import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

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

import '../styles/configure.css';

import DeviceSchema from '../components/DeviceSchema';
import VersionsSelect from '../components/VersionsSelect';
import StopStartButton from '../components/StopStartButton';
import ConnectorStatus from '../components/ConnectorStatus';
import VersionStatus from '../components/VersionStatus';

import {
  getDevice,
  updateDevice,
  sendPing,
} from '../services/device-service';
import { connectorDetails } from '../services/connector-detail-service';

export default class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      device: null,
      details: null,
      loading: true,
      configureSchema: null,
      changeVersion: false,
      selectedVersion: null,
      statusDevice: null,
      model: null,
      message: null
    };
    this.checkForUpdates = true;
    this.handleConfig  = this.handleConfig.bind(this);
    this.stopConnector  = this.stopConnector.bind(this);
    this.startConnector  = this.startConnector.bind(this);
    this.handleNameChange  = this.handleNameChange.bind(this);
    this.sendPingAndUpdate  = this.sendPingAndUpdate.bind(this);
    this.loadDevice  = this.loadDevice.bind(this);
    this.loadStatusDevice  = this.loadStatusDevice.bind(this);
    this.setCurrentVersion  = this.setCurrentVersion.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.versionSelect  = this.versionSelect.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    this.checkForUpdates = true
    getDevice({ uuid }, (error, device) => {
      if(error) return this.setState({ error })
      this.setState({ model: _.cloneDeep(device) })
      this.setDevice(device)
      const { connector } = device;
      connectorDetails({ connector }, (error, details) => {
        this.setState({ details, loading: false })
        this.setCurrentVersion()
      })
      this.sendPingAndUpdate()
    })
  }

  componentWillUnmount() {
    this.checkForUpdates = false
  }

  loadDevice(callback) {
    if(!callback) callback = _.noop;
    const { uuid } = this.props.params;
    getDevice({ uuid }, (error, device) => {
      if(error) return this.setState({ error })
      this.setDevice(device)
      callback()
    })
  }

  setDevice(device) {
    const picked = _.pick(device, ['name', 'type', 'online', 'lastPong', 'connectorMetadata', 'statusDevice'])
    this.setState({ device: picked })
  }

  getStatusDeviceUUID() {
    if(this.state.device == null) return null
    return this.state.device.statusDevice
  }

  loadStatusDevice(callback) {
    const uuid = this.getStatusDeviceUUID()
    if(!uuid) return
    getDevice({ uuid }, (error, statusDevice) => {
      if(error) return this.setState({ error })
      this.setState({ statusDevice: _.pick(statusDevice, ['lastPong', 'online']) })
      callback()
    })
  }

  sendPingAndUpdate() {
    if(!this.checkForUpdates) return
    const uuid = this.getStatusDeviceUUID()
    if(!uuid) return
    sendPing({ uuid }, (error) => {
      if (error) return console.error(error);
      _.delay(() => {
        if(!this.checkForUpdates) return
        this.loadStatusDevice(() => {
          _.delay(this.sendPingAndUpdate, 5000);
        })
        this.loadDevice()
      }, 2000);
    });
  }

  handleConfig({ properties, selected }) {
    const { uuid } = this.props.params;
    clearTimeout(this.messageTimeout);
    updateDevice({ uuid, properties }, (error) => {
      if (error) {
        this.setState({ error });
        return;
      }
      const { model } = this.state;
      this.setState({ message: 'Device Updated', model: _.assign({}, model, properties) });
      this.messageTimeout = setTimeout(() => {
        this.setState({ message: null });
      }, 5000)
    })
  }

  handleNameChange() {
    const ref = this.refs.deviceName;
    const deviceName = ReactDOM.findDOMNode(ref).value;
    this.handleConfig({ properties: { name: deviceName } });
  }

  startConnector() {
    let { connectorMetadata } = this.state.device;
    connectorMetadata.stopped = false;
    this.handleConfig({ properties: { connectorMetadata } })
  }

  stopConnector() {
    let { connectorMetadata } = this.state.device;
    connectorMetadata.stopped = true;
    this.handleConfig({ properties: { connectorMetadata } })
  }

  updateVersion({ version }) {
    let { connectorMetadata } = this.state.device;
    connectorMetadata.version = version;
    this.handleConfig({ properties: { connectorMetadata }})
    this.setState({ changeVersion: false })
  }

  changeVersion() {
    this.setState({ changeVersion: true })
  }

  setCurrentVersion() {
    const { details, device } = this.state;
    if(device.connectorMetadata == null) return
    const { version } = device.connectorMetadata;
    const isLatest = details['dist-tags'].latest == version;
    this.versionSelect({ version, latest: isLatest, pkg: details.versions[version] })
  }

  versionSelect(versionInfo) {
    this.setState({ selectedVersion: versionInfo });
  }

  getButtons() {
    const { device, statusDevice, details } = this.state;
    if(device == null) {
      return null
    }
    const { connectorMetadata } = device;
    let buttons = [];
    if(statusDevice != null) {
      buttons.push(<ConnectorStatus device={statusDevice} connectorMetadata={device.connectorMetadata}/>)
    } else {
      buttons.push(<ConnectorStatus device={device} connectorMetadata={device.connectorMetadata} />)
    }

    if(connectorMetadata != null) {
      const { stopped, version } = connectorMetadata;
      buttons.push(<StopStartButton
        startAction={this.startConnector}
        stopAction={this.stopConnector}
        stopped={stopped}
      />)
      if(details != null) {
        buttons.push(<VersionStatus version={version} onSelect={this.changeVersion} />)
      }
    }

    buttons.push(<Link
      to={`/connectors/generate/${device.uuid}`}
      className="Button Button--hollow-primary">
        Generate Update Installer
      </Link>);

    return _.map(buttons, (button, index) => {
      return <li key={index} className="Configure--Actions-item">{button}</li>
    })
  }

  renderContent(content) {
    const { connector } = this.props.params;
    return (
      <Page>
        <PageHeader>
          <PageTitle>Configure Thing</PageTitle>
          <PageActions><ul className="Configure--Actions">{this.getButtons()}</ul></PageActions>
        </PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const { device, model, loading, error, message, changeVersion} = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }

    if (loading) {
      return this.renderContent(<Spinner size="large" />);
    }

    if(changeVersion) {
      const { details, selectedVersion } = this.state;
      const { type } = device;
      return this.renderContent(<VersionsSelect
        onSelect={this.updateVersion}
        selected={selectedVersion}
        type={type}
        versions={details.versions} />);
    }

    return this.renderContent(
      <div>
        <FormField label="Device Name" name="deviceName">
          <FormInput type="text" ref="deviceName" name="deviceName" defaultValue={device.name} />
        </FormField>
        <FormActions>
          <Button onClick={this.handleNameChange} kind="primary">Change Name</Button>
        </FormActions>
        <DeviceSchema
          device={model}
          onSubmit={this.handleConfig}
          />
        <h4>{message}</h4>
      </div>
    );
  }
}
