import React, { Component } from 'react';
import { Link } from 'react-router';

import { getAvailableNodeTypes } from '../services/node-type-service';

import {
  Spinner,
  ErrorState,
  Page,
  PageHeader,
  PageTitle
} from 'zooid-ui';

import Connectors from '../components/Connectors';

export default class Available extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      connectors: null,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    getAvailableConnectors((error, connectors)=>{
      this.setState({ error, connectors, loading: false });
    });
  }

  renderContent(content) {
    return (
      <Page>
        <PageHeader>
          <PageTitle>Available Connectors</PageTitle>
        </PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const { loading, error, connectors } = this.state;

    if (loading) return this.renderContent(<Spinner size="large"/>);
    if (error) return this.renderContent(<ErrorState title={error.message} />);

    return this.renderContent(<Connectors connectors={connectors} />);
  }
}
