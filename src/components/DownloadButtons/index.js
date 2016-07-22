import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import DownloadButton from '../DownloadButton'

import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const DownloadButtons = ({downloadURL, error, fetchDownloadURL, fetching, otp, os, arch}) => {
  return (
    <div className={styles.wrapper}>
      <DownloadButton downloadURL={downloadURL} error={error} fetchDownloadURL={fetchDownloadURL} fetching={fetching} otp={otp} os={os} arch={arch} />
      <Link to="">Other Install Options</Link>
    </div>
  )
}

DownloadButtons.propTypes    = propTypes
DownloadButtons.defaultProps = defaultProps

export default DownloadButtons
