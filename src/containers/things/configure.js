import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PageLayout from '../page-layout';
import { setBreadcrumbs } from '../../actions/page-actions'

import {
  EmptyState,
} from 'zooid-ui'

import DeviceActions from '../../components/DeviceActions';
import DeviceSchema from '../../components/DeviceSchema';
import VersionsSelect from '../../components/VersionsSelect';
import StatusDeviceErrors from '../../components/StatusDeviceErrors';

import { selectVersion } from '../../actions/connectors/detail-actions';
import { fetchDevice, updateDeviceAction } from '../../actions/things/device-actions';
import { updateStatusDevice, pingStatusDevice } from '../../actions/things/status-device-actions';

import { getSchema } from '../../services/schema-service';

function needsUpdate({ updatedAt }) {
  if (!updatedAt) return true
  const tenSecondsAgo = moment().subtract(10, 'seconds')
  return moment(updatedAt).isBefore(tenSecondsAgo)
}

class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeVersion: false,
      showErrors: false,
    };
    this.handleConfig  = this.handleConfig.bind(this);
    this.changeState  = this.changeState.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.changeVersion = this.changeVersion.bind(this);
    this.versionSelect  = this.versionSelect.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.shouldUpdateDevices = this.shouldUpdateDevices.bind(this);
  }

  componentDidMount() {
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
    const { uuid } = this.props.params
    this.props.dispatch(fetchDevice({ uuid }))
    this.updateInterval = setInterval(this.shouldUpdateDevices, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }

  shouldUpdateDevices() {
    const { device, statusDevice } = this.props;
    if (!device.item) return

    if (needsUpdate(statusDevice)) {
      this.props.dispatch(pingStatusDevice({ device: device.item }))
    }

    if (needsUpdate(device)) {
      this.props.dispatch(fetchDevice({ uuid: device.item.uuid, fetching: false }))
    }
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
    this.props.dispatch(updateStatusDevice({ device: device.item, properties }))
  }

  versionSelect(selectedVersion) {
    this.props.dispatch(selectVersion(selectedVersion))
  }

  updateVersion({ version, pkg }) {
    const { connectorMetadata } = this.props.device.item;
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

  changeState({ stopped }) {
    const { connectorMetadata } = this.props.device.item;
    connectorMetadata.stopped = stopped;
    this.handleConfig({ properties: { connectorMetadata } })
  }

  handleConfig({ properties }) {
    const { uuid } = this.props.params;
    this.props.dispatch(updateDeviceAction({ uuid, properties }))
  }

  renderContent(content) {
    const { device, statusDevice } = this.props;
    const { type, uuid, name } = device.item
    const title = name || ''
    const actions = (
      <DeviceActions
        device={device.item}
        statusDevice={statusDevice.item}
        changeState={this.changeState}
        changeVersion={this.changeVersion}
      />
    )
    return (
      <PageLayout
        title={title}
        type={type}
        actions={actions}
      >
        <h3>UUID: {uuid}</h3>
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

    if (!_.isEmpty(statusDevice.item.errors)) {
      if (showErrors) {
        return this.renderContent(
          <StatusDeviceErrors
            statusDevice={statusDevice.item}
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
        <DeviceSchema device={device.item} onSubmit={this.handleConfig} />
      </div>
    );
  }
}

Configure.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ statusDevice, details, device }) {
  return { statusDevice, details, device }
}

export default connect(mapStateToProps)(Configure)
