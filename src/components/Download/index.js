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

function getOS({ asset }) {
  if (matchAsset(asset, 'darwin')) {
    return 'darwin'
  }
  if (matchAsset(asset, 'windows')) {
    return 'windows'
  }
  if (matchAsset(asset, 'linux')) {
    return 'linux'
  }
  return null
}

function getIcon({ asset }) {
  const os = getOS({ asset })
  if (os === 'darwin') {
    return <FaApple />
  }
  if (os === 'windows') {
    return <FaWindows />
  }
  if (os === 'linux') {
    return <FaLinux />
  }
  return null
}

function getArch({ asset }) {
  if (/386/.test(asset)) {
    return '386'
  }
  if (/amd64/.test(asset)) {
    return 'amd64'
  }
  if (/arm/.test(asset)) {
    return 'arm'
  }
  return null
}

function getDisplayArch({ asset }) {
  const arch = getArch({ asset })
  if (arch === '386') {
    return '[x86]'
  }
  if (arch === 'amd64') {
    return '[x64]'
  }
  if (arch === 'arm') {
    return '[arm]'
  }
  return null
}


function getPlatformFromAsset({ asset }) {
  const arch = getArch({ asset })
  const os = getOS({ asset })
  if (arch == null) {
    return null
  }
  if (os == null) {
    return null
  }
  return `${os}-${arch}`
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
    const buttons = _.map(filterAssets, ({ name }) => {
      const platform = getPlatformFromAsset({ asset: name })
      return this.getButton({ asset: name, platform })
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

  getButton({ asset, platform }) {
    const Icon = getIcon({ asset })
    const arch = getDisplayArch({ asset })
    if (Icon == null || arch == null) {
      return null
    }
    return (
      <Button
        key={asset}
        kind="hollow-primary"
        onClick={this.download({ platform })}
      >
        <i className="Download--icon">{Icon}</i> {arch} Download
      </Button>
    )
  }

  download({ platform }) {
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
          <h3>If the download has not started, use the link below.</h3>
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
