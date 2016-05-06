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

import NodeTypes from '../components/NodeTypes';

export default class Available extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      nodeTypes: null,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    getAvailableNodeTypes((error, nodeTypes)=>{
      this.setState({ error, nodeTypes, loading: false });
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
    const { loading, error, nodeTypes } = this.state;

    if (loading) return this.renderContent(<Spinner size="large"/>);
    if (error) return this.renderContent(<ErrorState title={error.message} />);

    return this.renderContent(
      <div>
        <h3>New Connectors</h3>
        <NodeTypes nodeTypes={nodeTypes.new} />
        <h3>Legacy Connectors</h3>
        <NodeTypes nodeTypes={nodeTypes.old} />
      </div>
    );
  }
}
