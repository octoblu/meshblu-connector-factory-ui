import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PageLayout from '../page-layout';
import { setBreadcrumbs } from '../../actions/page-actions'

import {
  EmptyState,
} from 'zooid-ui'

import DeviceSchema from '../../components/DeviceSchema';
import VersionsSelect from '../../components/VersionsSelect';
import StopStartButton from '../../components/StopStartButton';
import ConnectorStatus from '../../components/ConnectorStatus';
import VersionStatus from '../../components/VersionStatus';
import StatusDeviceErrors from '../../components/StatusDeviceErrors';

import { selectVersion } from '../../actions/connectors/detail-actions';
import { fetchDevice, updateDeviceAction } from '../../actions/things/device-actions';
import {
  updateStatusDevice,
  pingStatusDevice,
} from '../../actions/things/status-device-actions';

import { getSchema } from '../../services/schema-service';

class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeVersion: false,
      showErrors: false,
    };
    this.getButtons  = this.getButtons.bind(this);
    this.handleConfig  = this.handleConfig.bind(this);
    this.changeConnectorState  = this.changeConnectorState.bind(this);
    this.sendPingAndUpdate  = this.sendPingAndUpdate.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.versionSelect  = this.versionSelect.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'My Things',
        link: '/things/my',
      },
      {
        label: 'Configure',
      },
    ]))
    this.props.dispatch(fetchDevice({ uuid, useBaseProps: true }))
    this.checkForUpdates = true
  }

  componentWillReceiveProps(nextProps) {
    const { device } = nextProps;
    if (device.uuid != null) {
      this.sendPingAndUpdate()
    }
  }

  componentWillUnmount() {
    this.checkForUpdates = false
  }

  getButtons() {
    const { device, statusDevice, details } = this.props;
    if (device == null) {
      return null
    }
    const { connectorMetadata } = device;
    const buttons = [];
    if (statusDevice != null) {
      buttons.push(<ConnectorStatus device={statusDevice} connectorMetadata={device.connectorMetadata} />)
    } else {
      buttons.push(<ConnectorStatus device={device} connectorMetadata={device.connectorMetadata} />)
    }

    if (connectorMetadata != null) {
      const { stopped, version } = connectorMetadata;
      buttons.push(<StopStartButton
        changeState={this.changeConnectorState}
        stopped={stopped}
      />)
      if (details != null) {
        buttons.push(<VersionStatus version={version} onSelect={this.changeVersion} />)
      }
    }

    buttons.push(
      <Link
        to={`/connectors/generate/${device.uuid}`}
        className="Button Button--hollow-primary"
      >
        Generate Update Installer
      </Link>
    );

    return _.map(buttons, (button, index) => {
      return <li key={index}>{button}</li>
    })
  }

  changeVersion() {
    this.setState({ changeVersion: true, selectedVersion: null })
  }

  showErrors() {
    this.setState({ showErrors: true })
  }

  clearErrors() {
    const { device } = this.props
    const properties = { errors: [], updateErrorsAt: null }
    this.props.dispatch(updateStatusDevice({ device, properties }))
  }

  versionSelect(selectedVersion) {
    this.props.dispatch(selectVersion(selectedVersion))
  }

  updateVersion({ version, pkg }) {
    const { connectorMetadata } = this.props.device;
    connectorMetadata.version = version;
    getSchema({ pkg }, (error, schema = {}) => {
      if (error) return this.setState({ error })
      const { schemas } = schema
      const properties = { connectorMetadata }
      if (schemas) {
        properties.schemas = schemas
      }
      this.handleConfig({ properties })
      this.setState({ changeVersion: false })
    });
  }

  changeConnectorState({ stopped }) {
    const { connectorMetadata } = this.props.device;
    connectorMetadata.stopped = stopped;
    this.handleConfig({ properties: { connectorMetadata } })
  }

  handleConfig({ properties }) {
    const { uuid } = this.props.params;
    this.props.dispatch(updateDeviceAction({ uuid, properties }))
  }

  sendPingAndUpdate() {
    if (!this.checkForUpdates) return
    const { device } = this.props
    this.props.dispatch(pingStatusDevice({ device, useBaseProps: true }))
  }

  renderContent(content) {
    const { device } = this.props;
    const { type, uuid } = device
    let title = 'Configure'
    if (uuid && type) {
      title = `${type} ${uuid}`
    }
    return (
      <PageLayout
        title={title}
        actions={this.getButtons()}
      >
        {content}
      </PageLayout>
    );
  }

  render() {
    const { device, statusDevice } = this.props
    const { changeVersion, showErrors } = this.state

    if (changeVersion) {
      const { info, selectedVersion } = this.props.details
      return this.renderContent(<VersionsSelect
        onSelect={this.updateVersion}
        selected={selectedVersion}
        versions={info.versions}
      />);
    }

    if (!_.isEmpty(statusDevice.errors)) {
      if (showErrors) {
        return this.renderContent(
          <StatusDeviceErrors
            statusDevice={statusDevice}
            clearErrors={this.clearErrors}
          />
        )
      }
      return this.renderContent(
        <EmptyState
          action={this.showErrors}
          cta="Show Errors"
          title="Connector Errored"
          description="The connector failed and exited, logs are available"
        />
      )
    }

    return this.renderContent(
      <div>
        <DeviceSchema device={device} onSubmit={this.handleConfig} />
      </div>
    );
  }
}

Configure.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ statusDevice, details, device }) {
  return {
    statusDevice: statusDevice.item,
    details,
    device: device.item,
  }
}

export default connect(mapStateToProps)(Configure)
