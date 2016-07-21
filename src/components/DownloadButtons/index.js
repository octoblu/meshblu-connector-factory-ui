import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'

import styles from './styles.css'


const propTypes = {}
const defaultProps = {}

const DownloadButtons = ({fetchDownloadLink, downloadLink, os, arch}) => {
  fetchDownloadLink()

  return (
    <div className={styles.wrapper}>
      <Button className={styles.DownloadButton} kind="primary">Download OSX Connector Installer</Button>
      <Link to="">Other Install Options</Link>

      <dl>
        <dt>OS</dt>
        <dd>{os}</dd>
        <dt>Arch</dt>
        <dd>{arch}</dd>
      </dl>
    </div>
  )
}

DownloadButtons.propTypes    = propTypes
DownloadButtons.defaultProps = defaultProps

export default DownloadButtons
