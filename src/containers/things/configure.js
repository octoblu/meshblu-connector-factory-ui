import React, { Component } from 'react';
import { Link } from 'react-router';
import PageLayout from '../page-layout';
import _ from 'lodash';

import {
  EmptyState
} from 'zooid-ui'

import DeviceSchema from '../../components/DeviceSchema';
import VersionsSelect from '../../components/VersionsSelect';
import StopStartButton from '../../components/StopStartButton';
import ConnectorStatus from '../../components/ConnectorStatus';
import VersionStatus from '../../components/VersionStatus';
import StatusDeviceErrors from '../../components/StatusDeviceErrors';

import {
  getDevice,
  getStatusDevice,
  updateDevice,
  updateStatusDevice,
  sendPing,
} from '../../services/device-service';

import { getSchema } from '../../services/schema-service';

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
      statusDevice: {},
      showErrors: false,
      model: null,
      message: null
    };
    this.checkForUpdates = true;
    this.getButtons  = this.getButtons.bind(this);
    this.handleConfig  = this.handleConfig.bind(this);
    this.changeConnectorState  = this.changeConnectorState.bind(this);
    this.sendPingAndUpdate  = this.sendPingAndUpdate.bind(this);
    this.loadDevice  = this.loadDevice.bind(this);
    this.setCurrentVersion  = this.setCurrentVersion.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.versionSelect  = this.versionSelect.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
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
    const picked = _.pick(device, ['uuid', 'name', 'type', 'online', 'lastPong', 'connectorMetadata', 'statusDevice'])
    this.setState({ device: picked })
  }

  sendPingAndUpdate() {
    if(!this.checkForUpdates) return
    sendPing(this.state.device, (error, statusDevice) => {
      if (error) return console.error(error);
      this.setState({ statusDevice })
      _.delay(this.sendPingAndUpdate, 5000);
      this.loadDevice()
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

  changeConnectorState({ stopped }) {
    let { connectorMetadata } = this.state.device;
    connectorMetadata.stopped = stopped;
    this.handleConfig({ properties: { connectorMetadata } })
  }

  updateVersion({ version, pkg }) {
    let { connectorMetadata } = this.state.device;
    connectorMetadata.version = version;
    getSchema({ pkg }, (error, schema={}) => {
      if(error) return this.setState({ error })
      const { schemas } = schema
      const properties = {connectorMetadata}
      if(schemas){
        properties.schemas = schemas
      }
      this.handleConfig({ properties })
      this.setState({ changeVersion: false })
    });
  }

  changeVersion() {
    this.setState({ changeVersion: true, selectedVersion: null })
  }

  showErrors() {
    this.setState({ showErrors: true })
  }

  clearErrors() {
    const { device, statusDevice } = this.state
    statusDevice.errors = []
    this.setState({ showErrors: false, statusDevice: statusDevice })
    updateStatusDevice({ device, properties: { errors: [], updateErrorsAt: null } }, (error) => {
      if(error) return console.error(error);
    })
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
        changeState={this.changeConnectorState}
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
      return <li key={index}>{button}</li>
    })
  }

  renderContent(content) {
    const { loading, error } = this.state;
    return (
      <PageLayout
        title="Configure Thing"
        loading={loading}
        error={error}
        actions={this.getButtons()}>
        {content}
      </PageLayout>
    );
  }

  render() {
    const { device, model, message, changeVersion, showErrors, statusDevice } = this.state;

    if(changeVersion) {
      const { details, selectedVersion } = this.state;
      const { type } = device;
      return this.renderContent(<VersionsSelect
        onSelect={this.updateVersion}
        selected={selectedVersion}
        type={type}
        versions={details.versions} />);
    }

    if(!_.isEmpty(statusDevice.errors)){
      if(showErrors) {
        return this.renderContent(<StatusDeviceErrors statusDevice={statusDevice} clearErrors={this.clearErrors} />)
      }
      return this.renderContent(<EmptyState action={this.showErrors} cta="Show Errors" title="Device Errored" />)
    }

    return this.renderContent(
      <div>
        <DeviceSchema device={model} onSubmit={this.handleConfig} />
        <h4>{message}</h4>
      </div>
    );
  }
}
