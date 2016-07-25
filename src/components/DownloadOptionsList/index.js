import React, { PropTypes } from 'react'
import FaApple   from 'react-icons/lib/fa/apple'
import FaWindows from 'react-icons/lib/fa/windows'
import FaLinux   from 'react-icons/lib/fa/linux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import Button from 'zooid-button'
import OsArchButton from '../OsArchButton'

import styles from './styles.css'

const GUI_RELEASE_PREFIX="https://file-downloader.octoblu.com/github-release/octoblu/electron-meshblu-connector-installer/latest/MeshbluConnectorInstaller"
const CLI_RELEASE_PREFIX="https://file-downloader.octoblu.com/github-release/octoblu/go-meshblu-connector-installer/latest/meshblu-connector-installer"

const DownloadList = ({otp, uuid, onItemClick}) => {
  return (
    <div className={styles.wrapper}>

      <Tabs selectedIndex={0}>
        <TabList>
          <Tab>Graphical</Tab>
          <Tab>Command Line</Tab>
        </TabList>
        <TabPanel>
          <section>
            <h2>Graphical Installer</h2>
            <p>The graphical will walk you through the installation process. If in doubt, choose this option. Install your connector using one of the links below, then click next to configure your device</p>

            <div className={styles.columns}>
              <div className={styles.column}>
                <h3><FaApple /></h3>
                <ul>
                  <li><OsArchButton os={'darwin'} arch={'amd64'} href={`${GUI_RELEASE_PREFIX}-darwin-amd64.dmg?fileName=MeshbluConnectorInstaller-${otp}.dmg`}/></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaWindows /></h3>
                <ul>
                  <li><OsArchButton os={'windows'} arch={'amd64'} href={`${GUI_RELEASE_PREFIX}-windows-amd64.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
                  <li><OsArchButton os={'windows'} arch={'386'} href={`${GUI_RELEASE_PREFIX}-windows-386.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaLinux /></h3>
                <ul>
                  <li><OsArchButton os={'linux'} arch={'amd64'} href={`${GUI_RELEASE_PREFIX}-linux-amd64.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
                  <li><OsArchButton os={'linux'} arch={'386'} href={`${GUI_RELEASE_PREFIX}-linux-386.zip?fileName=MeshbluConnectorInstaller-${otp}.zip`}/></li>
                </ul>
              </div>
            </div>
          </section>
        </TabPanel>

        <TabPanel>
          <section>
            <h2>Command Line Installer</h2>
            <p>The command line installer allows users to install the connector programatically,
              or in environments where no Desktop environment is available. When you run the installer,
              it will ask for your one time password. Install your connector using one of the links below,
              then click next to configure your device</p>

            <h4>Your One Time Password</h4>
            <pre><code className={styles.command}>{otp}</code></pre>

            <div className={styles.columns}>
              <div className={styles.column}>
                <h3><FaApple /></h3>
                <ul>
                  <li><OsArchButton os={'darwin'} arch={'amd64'} href={`${CLI_RELEASE_PREFIX}-darwin-amd64?fileName=meshblu-connector-installer-${otp}`}/></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaWindows /></h3>
                <ul>
                  <li><OsArchButton os={'windows'} arch={'386'} href={`${CLI_RELEASE_PREFIX}-windows-386?fileName=meshblu-connector-installer-${otp}`}/></li>
                  <li><OsArchButton os={'windows'} arch={'amd64'} href={`${CLI_RELEASE_PREFIX}-windows-amd64?fileName=meshblu-connector-installer-${otp}`}/></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3><FaLinux /></h3>
                <ul>
                  <li><OsArchButton os={'linux'} arch={'386'} href={`${CLI_RELEASE_PREFIX}-linux-386?fileName=meshblu-connector-installer-${otp}`}/></li>
                  <li><OsArchButton os={'linux'} arch={'amd64'} href={`${CLI_RELEASE_PREFIX}-linux-amd64?fileName=meshblu-connector-installer-${otp}`}/></li>
                  <li><OsArchButton os={'linux'} arch={'arm'} href={`${CLI_RELEASE_PREFIX}-linux-arm?fileName=meshblu-connector-installer-${otp}`}/></li>
                </ul>
              </div>

            </div>

            <h4>How To Use (in Bash)</h4>
            <pre className={styles.command}>
              <code>
              chmod +x meshblu-connector-installer \{'\n'}
              && ./meshblu-connector-installer --one-time-password {otp}
              </code>
            </pre>
          </section>
        </TabPanel>
      </Tabs>
      <Button kind="primary" href={`/connectors/configure/${uuid}`}>Next: Configure</Button>
    </div>
  )
}

export default DownloadList
