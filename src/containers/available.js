import React, { Component } from 'react';
import PageLayout from './page-layout';

import { getAvailableNodeTypes } from '../services/node-type-service';

import NodeTypes from '../components/NodeTypes';

export default class Available extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      nodeTypes: {
        new: [],
        old: [],
      },
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    getAvailableNodeTypes((error, nodeTypes)=>{
      this.setState({ error, nodeTypes, loading: false });
    });
  }

  render() {
    const { loading, error, nodeTypes } = this.state;

    return <PageLayout title="Available Things" loading={loading} error={error}>
      <div>
        <h3>Compatible with the new Connector Installer</h3>
        <NodeTypes nodeTypes={nodeTypes.new} />
        <h3>Backwards compatible with Connector Installer</h3>
        <NodeTypes nodeTypes={nodeTypes.old} />
      </div>
    </PageLayout>
  }
}
