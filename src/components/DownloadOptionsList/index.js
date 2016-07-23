import React, { PropTypes } from 'react'

import OsArchButton from '../OsArchButton'

import styles from './styles.css'

const GUI_RELEASE_PREFIX="https://file-downloader.octoblu.com/github-release/octoblu/electron-meshblu-connector-installer/latest/MeshbluConnectorInstaller"
const CLI_RELEASE_PREFIX="https://file-downloader.octoblu.com/github-release/octoblu/go-meshblu-connector-installer/latest/meshblu-connector-installer"

const DownloadList = ({otp, onItemClick}) => {
  return (
    <div className={styles.wrapper}>
      <p>Install your connector using one of the following, then click next</p>

      <section>
        <h2>Graphical Installer</h2>
        <p>The graphical will walk you through the installation process. If in doubt, choose this option.</p>
        <h3>macOS</h3>
        <ul>
          <li><OsArchButton os={'darwin'} arch={'amd64'} href={`${GUI_RELEASE_PREFIX}-darwin-amd64.dmg?fileName=MeshbluConnectorInstaller-${otp}.dmg`}/></li>
        </ul>
        <h3>Windows</h3>
        <ul>
          <li><OsArchButton os={'windows'} arch={'amd64'} href={`${GUI_RELEASE_PREFIX}-windows-amd64.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
          <li><OsArchButton os={'windows'} arch={'386'} href={`${GUI_RELEASE_PREFIX}-windows-386.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
        </ul>
        <h3>Linux</h3>
        <ul>
          <li><OsArchButton os={'linux'} arch={'amd64'} href={`${GUI_RELEASE_PREFIX}-linux-amd64.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
          <li><OsArchButton os={'linux'} arch={'386'} href={`${GUI_RELEASE_PREFIX}-linux-386.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
        </ul>
      </section>

      <section>
        <h2>Command Line Installer</h2>
        <p>The command line installer allows users to install the connector programatically,
          or in environments where no Desktop environment is available. When you run the installer,
        it will ask for your one time password. Your one time password is: <code>{otp}</code></p>
        <pre><code>./meshblu-connector-installer --one-time-password {otp}</code></pre>

        <h3>macOS</h3>
        <ul>
          <li><OsArchButton os={'darwin'} arch={'amd64'} href={`${CLI_RELEASE_PREFIX}-darwin-amd64?fileName=meshblu-connector-installer-${otp}`}/></li>
        </ul>
        <h3>Windows</h3>
        <ul>
          <li><OsArchButton os={'windows'} arch={'386'} href={`${CLI_RELEASE_PREFIX}-windows-386?fileName=meshblu-connector-installer-${otp}`}/></li>
          <li><OsArchButton os={'windows'} arch={'amd64'} href={`${CLI_RELEASE_PREFIX}-windows-amd64?fileName=meshblu-connector-installer-${otp}`}/></li>
        </ul>
        <h3>Linux</h3>
        <ul>
          <li><OsArchButton os={'linux'} arch={'386'} href={`${CLI_RELEASE_PREFIX}-linux-386?fileName=meshblu-connector-installer-${otp}`}/></li>
          <li><OsArchButton os={'linux'} arch={'amd64'} href={`${CLI_RELEASE_PREFIX}-linux-amd64?fileName=meshblu-connector-installer-${otp}`}/></li>
          <li><OsArchButton os={'linux'} arch={'arm'} href={`${CLI_RELEASE_PREFIX}-linux-arm?fileName=meshblu-connector-installer-${otp}`}/></li>
        </ul>
      </section>
    </div>
  )
}

export default DownloadList
