import React, { PropTypes, Component } from 'react';
import {
  Button,
  Page,
  PageHeader,
  Spinner
} from 'zooid-ui'

import Versions from '../components/Versions'
import VersionInfo from '../components/VersionInfo'

import ConnectorDetailService from '../helpers/connector-detail-service'


export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      details: null,
      selectedVersion: null,
      loading: true
    }
    this.versionSelect = this.versionSelect.bind(this);
    this.connectorDetailService = new ConnectorDetailService();
  }

  componentDidMount() {
    const { connector } = this.props.params;
    this.connectorDetailService.details(connector, (error, details) => {
      this.setState({ error, details, loading: false })
    })
  }

  versionSelect(versionInfo) {
    this.setState({ selectedVersion: versionInfo })
  }

  renderContent(content) {
    const { connector } = this.props.params;
    return (
      <Page>
        <PageHeader>Creating connector: {connector}</PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const { error, loading, details, selectedVersion } = this.state;
    if (error) return this.renderContent(<ErrorState description={error.message} />);
    if (loading) return this.renderContent(<Spinner size="large" />);
    if (selectedVersion) return this.renderContent(<h1>Selected <VersionInfo info={selectedVersion} /></h1>)
    return this.renderContent(<Versions versions={details.versions} select={this.versionSelect}/>)
  }
}
