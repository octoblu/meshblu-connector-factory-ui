import React, { PropTypes } from 'react'
import FaApple   from 'react-icons/lib/fa/apple'
import FaWindows from 'react-icons/lib/fa/windows'
import FaLinux   from 'react-icons/lib/fa/linux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Spinner from 'zooid-spinner'

import Button from 'zooid-button'
import OsArchButton from '../OsArchButton'

import styles from './styles.css'

const GUI_RELEASE_PREFIX = 'https://file-downloader.octoblu.com/installer/octoblu/electron-meshblu-connector-installer'
const CLI_RELEASE_PREFIX = 'https://file-downloader.octoblu.com/github-release/octoblu/go-meshblu-connector-installer/latest/meshblu-connector-installer'

const propTypes = {
  fetchAvailableDownloads: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  availableDownloads: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  uuid: PropTypes.string.isRequired,
  otp: PropTypes.string.isRequired,
}

const DownloadList = ({ availableDownloads, fetching, otp, uuid, fetchAvailableDownloads, onClickNext }) => {
  const onClick = (event) => {
    event.preventDefault()
    onClickNext({ uuid })
  }

  fetchAvailableDownloads({ otp, fetching, availableDownloads })

  if (fetching) {
    return (
      <div className={styles.wrapper}>
        <Spinner size="large" />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>

      <Tabs selectedIndex={0}>
        <TabList>
          <Tab>Graphical Installer</Tab>
          <Tab>Command Line Installer</Tab>
        </TabList>
        <TabPanel>
          <section>
            <h2>Graphical Installer</h2>
            <p>The graphical will walk you through the installation process. If in doubt, choose this option. Install your connector using one of the links below, then click next to configure your device</p>

            <div className={styles.columns}>
              <div className={styles.column}>
                <h3><FaApple /></h3>
                <ul>
                  <li><OsArchButton os={'darwin'} arch={'amd64'} show={availableDownloads['darwin-amd64']} href={`${GUI_RELEASE_PREFIX}/darwin/amd64?fileName=MeshbluConnectorInstaller-${otp}.dmg`} /></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaWindows /></h3>
                <ul>
                  <li><OsArchButton os={'windows'} arch={'amd64'} show={availableDownloads['windows-amd64']} href={`${GUI_RELEASE_PREFIX}/windows/amd64?fileName=MeshbluConnectorInstaller-${otp}.zip`} /></li>
                  <li><OsArchButton os={'windows'} arch={'386'} show={availableDownloads['windows-386']} href={`${GUI_RELEASE_PREFIX}/windows/386?fileName=MeshbluConnectorInstaller-${otp}.zip`} /></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaLinux /></h3>
                <ul>
                  <li><OsArchButton os={'linux'} arch={'amd64'} show={availableDownloads['linux-amd64']} href={`${GUI_RELEASE_PREFIX}/linux/amd64?fileName=MeshbluConnectorInstaller-${otp}.zip`} /></li>
                  <li><OsArchButton os={'linux'} arch={'386'} show={availableDownloads['linux-386']} href={`${GUI_RELEASE_PREFIX}/linux/386?fileName=MeshbluConnectorInstaller-${otp}.zip`} /></li>
                  <li><OsArchButton os={'linux'} arch={'amd'} show={availableDownloads['linux-amd']} href={`${GUI_RELEASE_PREFIX}/linux/amd?fileName=MeshbluConnectorInstaller-${otp}.zip`} /></li>
                </ul>
              </div>
            </div>
          </section>
        </TabPanel>

        <TabPanel>
          <section>
            <h2>Command Line Installer</h2>
            <p>
              The command line installer allows users to install the connector programatically,
              or in environments where no Desktop environment is available. When you run the installer,
              it will ask for your one time password. Install your connector using one of the links below,
              then click next to configure your device
            </p>

            <h4>Your One Time Password</h4>
            <pre><code className={styles.command}>{otp}</code></pre>

            <div className={styles.columns}>
              <div className={styles.column}>
                <h3><FaApple /></h3>
                <ul>
                  <li><OsArchButton os={'darwin'} arch={'amd64'} show={availableDownloads['darwin-amd64']} href={`${CLI_RELEASE_PREFIX}-darwin-amd64?fileName=meshblu-connector-installer`} /></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaWindows /></h3>
                <ul>
                  <li><OsArchButton os={'windows'} arch={'386'} show={availableDownloads['windows-386']} href={`${CLI_RELEASE_PREFIX}-windows-386?fileName=meshblu-connector-installer`} /></li>
                  <li><OsArchButton os={'windows'} arch={'amd64'} show={availableDownloads['windows-amd64']} href={`${CLI_RELEASE_PREFIX}-windows-amd64?fileName=meshblu-connector-installer`} /></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaLinux /></h3>
                <ul>
                  <li><OsArchButton os={'linux'} arch={'386'} show={availableDownloads['linux-386']} href={`${CLI_RELEASE_PREFIX}-linux-386?fileName=meshblu-connector-installer`} /></li>
                  <li><OsArchButton os={'linux'} arch={'amd64'} show={availableDownloads['linux-amd64']} href={`${CLI_RELEASE_PREFIX}-linux-amd64?fileName=meshblu-connector-installer`} /></li>
                  <li><OsArchButton os={'linux'} arch={'arm'} show={availableDownloads['linux-arm']} href={`${CLI_RELEASE_PREFIX}-linux-arm?fileName=meshblu-connector-installer`} /></li>
                </ul>
              </div>

            </div>

            <h4>How To Use (in Bash)</h4>
            <p>
              In order to register as a service on Linux and Windows,
              the installer needs to be run using <code>sudo</code>, as <code>root</code>,
              or as any other user that has permission to modify the services.
            </p>
            <pre className={styles.command}>
              <code>
              chmod +x meshblu-connector-installer \{'\n'}
              && ./meshblu-connector-installer --one-time-password {otp}
              </code>
            </pre>
          </section>
        </TabPanel>
      </Tabs>
      <Button kind="primary" href={`/connectors/configure/${uuid}`} onClick={onClick}>Next: Configure</Button>
    </div>
  )
}

DownloadList.propTypes = propTypes

export default DownloadList
