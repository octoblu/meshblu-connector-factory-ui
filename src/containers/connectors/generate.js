import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbs } from '../../actions/page-actions'
import PageLayout from '../page-layout';

import VersionsSelect from '../../components/VersionsSelect';

import { generateConnectorAction, gotToGeneratedConnector } from '../../actions/connectors/connector-actions';
import { selectVersion } from '../../actions/connectors/detail-actions';
import { fetchDevice } from '../../actions/things/device-actions';

class Generate extends Component {
  constructor(props) {
    super(props);
    this.versionSelect = this.versionSelect.bind(this);
    this.updateAndGenerate = this.updateAndGenerate.bind(this);
  }

  componentDidMount() {
    const { uuid } = this.props.params;
    this.props.dispatch(setBreadcrumbs([
      {
        label: 'Dashboard',
        link: '/',
      },
      {
        label: 'My Things',
        link: '/things/my',
      },
      {
        label: 'Configure',
        link: `/things/configure/${uuid}`,
      },
      {
        label: 'Generate',
      },
    ]))
    this.props.dispatch(fetchDevice({ uuid }))
  }

  componentWillReceiveProps(nextProps) {
    const { key, uuid } = nextProps.connector;
    if (key && uuid) {
      this.props.dispatch(gotToGeneratedConnector({ key, uuid }))
    }
  }

  updateAndGenerate() {
    const { uuid } = this.props.params;
    const { version } = this.props.details.selectedVersion;
    const { octoblu, device } = this.props
    const { githubSlug } = device;
    const { connector } = device.item;
    this.props.dispatch(generateConnectorAction({ uuid, githubSlug, connector, version, octoblu }))
  }

  versionSelect(selectedVersion) {
    this.props.dispatch(selectVersion(selectedVersion));
  }

  render() {
    const { device } = this.props
    const { info, selectedVersion } = this.props.details
    return (
      <PageLayout type={device.item.type} title="Generate Installer">
        <VersionsSelect
          onSelect={this.updateAndGenerate}
          selected={selectedVersion}
          versions={info.tags}
        />
      </PageLayout>
    )
  }
}

Generate.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({ device, details, connector, octoblu }) {
  const { uuid, token } = octoblu
  return { device, details, connector, octoblu: { uuid, token } }
}

export default connect(mapStateToProps)(Generate)
