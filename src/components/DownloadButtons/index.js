import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'
import Spinner from 'zooid-spinner'

import styles from './styles.css'


const propTypes = {}
const defaultProps = {}

const DownloadButtons = ({fetchDownloadURL, fetching, downloadURL}) => {
  fetchDownloadURL({fetching, downloadURL})

  if (fetching) {
    return <Spinner className={styles.spinner} />
  }

  return (
    <div className={styles.wrapper}>
      <Button href={downloadURL} className={styles.DownloadButton} kind="primary">Download OSX Connector Installer</Button>
      <Link to="">Other Install Options</Link>

      <pre>{downloadURL}</pre>
    </div>
  )
}

DownloadButtons.propTypes    = propTypes
DownloadButtons.defaultProps = defaultProps

export default DownloadButtons