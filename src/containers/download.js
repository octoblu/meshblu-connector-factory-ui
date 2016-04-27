import React, { Component } from 'react';
import {
  Page,
  PageHeader,
  Spinner,
  EmptyState,
  Button,
} from 'zooid-ui';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
    this.download = this.download.bind(this);
  }

  componentDidMount() {
    const { key } = this.props.params;
    if(!key) {
      this.setState({ error: new Error('Invalid Key') })
    }
    this.setState({ loading: false });
  }

  download(platform) {
    const { key } = this.props.params;
    let ext = 'zip';
    if (/^darwin/.test(platform)) {
      ext = 'dmg';
    }
    let tag = 'v4.0.0';
    const baseUri = 'https://github.com/octoblu/electron-meshblu-connector-installer';
    const uri = `${baseUri}/releases/download/${tag}/MeshbluConnectorInstaller-${platform}.${ext}`;
    return () => {
      this.setState({ loading: true });
      const fileName = `MeshbluConnectorInstaller-${key}.${ext}`;
      const link = document.createElement('a');
      link.download = fileName;
      const uriEncoded = encodeURIComponent(uri);
      const fileNameEncoded = encodeURIComponent(fileName);
      link.href = `https://file-downloader.octoblu.com/download?fileName=${fileNameEncoded}&uri=${uriEncoded}`;
      console.log(link.href)
      link.click();
    }
  }

  renderContent(content) {
    const { connector } = this.props.params;
    return (
      <Page>
        <PageHeader>Download Installer</PageHeader>
        {content}
      </Page>
    );
  }

  render() {
    const {
      error,
      loading,
    } = this.state;

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />);
    }
    if (loading) {
      return this.renderContent(<Spinner size="large" />);
    }
    return this.renderContent(
      <ul>
        <li><Button onClick={this.download('darwin-amd64')}>Download Mac OS X</Button></li>
        <li><Button onClick={this.download('windows-amd64')}>Download Windows 64bit</Button></li>
        <li><Button onClick={this.download('windows-386')}>Download Windows 32bit</Button></li>
        <li><Button onClick={this.download('linux-amd64')}>Download Linux 64bit</Button></li>
        <li><Button onClick={this.download('linux-386')}>Download Linux 32bit</Button></li>
      </ul>
    );
  }
}
