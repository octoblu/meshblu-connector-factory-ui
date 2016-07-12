import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

import {
  Spinner,
  ErrorState,
  Button,
} from 'zooid-ui'

import FaApple from 'react-icons/lib/fa/apple'
import FaWindows from 'react-icons/lib/fa/windows'
import FaLinux from 'react-icons/lib/fa/linux'

import {
  getInstallerUri,
  getFileName,
  getDownloadUri,
} from '../../helpers/installer'

import './index.css'

function matchAsset(asset, searchFor) {
  if (asset.indexOf(searchFor) > -1) {
    return true
  }
  return false
}

function getIcon(asset) {
  if (matchAsset(asset, 'darwin')) {
    return <FaApple />
  }
  if (matchAsset(asset, 'windows')) {
    return <FaWindows />
  }
  if (matchAsset(asset, 'linux')) {
    return <FaLinux />
  }
  return null
}

function getArch(asset) {
  if (/386/.test(asset)) {
    return '[x86]'
  }
  if (/amd64/.test(asset)) {
    return '[x64]'
  }
  if (/arm/.test(asset)) {
    return '[arm]'
  }
  return null
}

export default class Download extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      downloading: false,
      downloadURI: null,
    }
    this.download = this.download.bind(this)
    this.getButtonRow = this.getButtonRow.bind(this)
    this.getButton = this.getButton.bind(this)
  }

  getButtonRow(friendlyName, searchFor, assets) {
    const filterAssets = _.filter(assets, ({ name }) => {
      return matchAsset(name, searchFor)
    })
    console.log({ assets, filterAssets, searchFor })
    const buttons = _.map(filterAssets, ({ name }) => {
      return this.getButton(name)
    })
    if (_.isEmpty(_.compact(buttons))) {
      return null
    }
    return (
      <div className="Download--row">
        <h4>{friendlyName}</h4>
        {buttons}
      </div>
    )
  }

  getButton(asset) {
    const Icon = getIcon(asset)
    const arch = getArch(asset)
    if (Icon == null || arch == null) {
      return null
    }
    return (
      <Button
        key={asset}
        kind="hollow-primary"
        onClick={this.download(asset)}
      >
        <i className="Download--icon">{Icon}</i> {arch} Download
      </Button>
    )
  }

  download(platform) {
    const { otp } = this.props
    return () => {
      this.setState({ downloading: true })
      getInstallerUri({ platform }, (error, uri) => {
        if (error) {
          return this.setState({ error })
        }
        const fileName = getFileName({ otp, platform })
        const link = document.createElement('a')
        if (!_.isUndefined(link.download)) {
          link.download = fileName
        }
        const downloadURI = getDownloadUri({ uri, fileName })
        _.delay(() => {
          this.props.onDownload()
          this.setState({ downloadURI, downloading: false })
        }, 20 * 1000)
        link.href = downloadURI
        link.click()
      })
    }
  }

  renderContent(content) {
    return (
      <div>
        {content}
      </div>
    )
  }

  render() {
    const {
      error,
      downloading,
      downloadURI,
    } = this.state

    if (error) {
      return this.renderContent(<ErrorState description={error.message} />)
    }

    if (downloading) {
      return this.renderContent(
        <div className="Download--Box">
          <Spinner size="large" />
          <h1 className="Download--action-title">Downloading...</h1>
        </div>
      )
    }

    if (downloadURI) {
      return this.renderContent(
        <div className="Download--Box">
          <h3>If download hasn't started, use link below.</h3>
          <a href={downloadURI}>manual download link</a>
        </div>
      )
    }

    const { assets } = this.props.selectedVersion.details

    return this.renderContent(
      <div className="Download--actions">
        {this.getButtonRow('macOS', 'darwin', assets)}
        {this.getButtonRow('Windows', 'windows', assets)}
        {this.getButtonRow('Linux', 'linux', assets)}
      </div>
    )
  }
}

Download.propTypes = {
  otp: PropTypes.string.isRequired,
  selectedVersion: PropTypes.object.isRequired,
  onDownload: PropTypes.func.isRequired,
}
