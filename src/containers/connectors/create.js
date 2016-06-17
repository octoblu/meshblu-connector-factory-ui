import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import PageLayout from '../page-layout'
import { setBreadcrumbs } from '../../actions/page-actions'

import VersionsSelect from '../../components/VersionsSelect';

import { fetchConnectorDetails, selectVersion } from '../../actions/connectors/detail-actions';
import { createConnectorAction } from '../../actions/connectors/connector-actions';
import { fetchAvailableNodes } from '../../actions/things/available-actions'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVersion: null,
    }
    this.versionSelect = this.versionSelect.bind(this);
    this.createDevice = this.createDevice.bind(this);
  }

  componentDidMount() {
    const { connector } = this.props.params;
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Dashboard',
        link: '/',
      },
      {
        label: 'All Things',
        link: '/things/all',
      },
      {
        label: 'Create',
      },
    ]))
    this.props.dispatch(fetchAvailableNodes())
    this.props.dispatch(fetchConnectorDetails({ connector }))
  }

  componentWillReceiveProps(nextProps) {
    const { key, uuid } = nextProps.connector;
    if (key && uuid) {
      this.props.dispatch(push(`/connectors/generated/${uuid}/${key}`))
    }
  }

  getNodeType() {
    const { legacy, latest } = this.props.available
    const { connector } = this.props.params
    const foundLatest = _.find(latest, { connector })
    if (foundLatest) return foundLatest
    const foundLegacy = _.find(legacy, { connector })
    if (foundLegacy) return foundLegacy
    return {}
  }

  createDevice() {
    const { connector } = this.props.params;
    const { octoblu } = this.props
    const { pkg } = this.props.details.selectedVersion;
    this.props.dispatch(createConnectorAction({ connector, pkg, octoblu }))
  }

  versionSelect(selectedVersion) {
    this.props.dispatch(selectVersion(selectedVersion))
  }

  renderContent(content) {
    const { type, name } = this.getNodeType()
    return (
      <PageLayout type={type} title={`Create ${name}`}>
        {content}
      </PageLayout>
    );
  }

  render() {
    const { info, selectedVersion } = this.props.details

    return this.renderContent(<VersionsSelect
      onSelect={this.createDevice}
      selected={selectedVersion}
      versions={info.versions}
    />);
  }
}

Create.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ available, details, connector, octoblu }) {
  const { uuid, token } = octoblu
  return { available, details, connector, octoblu: { uuid, token } }
}

export default connect(mapStateToProps)(Create)
