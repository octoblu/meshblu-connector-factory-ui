import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import DownloadButton from '../DownloadButton'

import styles from './styles.css'

const propTypes = {
  downloadURL:      PropTypes.string,
  fetchDownloadURL: PropTypes.func.isRequired,
  fetching:         PropTypes.bool,
  uuid:             PropTypes.string,
  otp:              PropTypes.string,
  os:               PropTypes.string,
  arch:             PropTypes.string,
}

const DownloadButtons = ({downloadURL, error, fetchDownloadURL, fetching, uuid, otp, os, arch}) => {
  return (
    <div className={styles.wrapper}>
      <DownloadButton downloadURL={downloadURL} error={error} fetchDownloadURL={fetchDownloadURL} fetching={fetching} otp={otp} os={os} arch={arch} />
      <Link to={`/connectors/generated/${uuid}/${otp}/download-options`}>Other Install Options</Link>
    </div>
  )
}

DownloadButtons.propTypes    = propTypes

export default DownloadButtons
