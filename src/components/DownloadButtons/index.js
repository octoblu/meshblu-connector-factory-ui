import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'

import DownloadButton from '../DownloadButton'

import styles from './styles.css'

const propTypes = {
  downloadURL:      PropTypes.string,
  fetchDownloadURL: PropTypes.func.isRequired,
  fetching:         PropTypes.bool,
  onClickDownload:  PropTypes.func.isRequired,
  onClickSkip:      PropTypes.func.isRequired,
  uuid:             PropTypes.string.isRequired,
  otp:              PropTypes.string.isRequired,
  os:               PropTypes.string,
  arch:             PropTypes.string,
}

const DownloadButtons = ({downloadURL, error, fetchDownloadURL, fetching, onClickDownload, onClickSkip, otp, uuid, os, arch}) => {
  const onClick = (event) => {
    event.preventDefault()
    onClickSkip({uuid})
  }

  return (
    <div className={styles.wrapper}>
      <DownloadButton
        downloadURL={downloadURL}
        error={error}
        fetchDownloadURL={fetchDownloadURL}
        fetching={fetching}
        onClickDownload={onClickDownload}
        otp={otp}
        uuid={uuid}
        os={os}
        arch={arch} />
      <Link to={`/connectors/generated/${uuid}/${otp}/download-options`}>Other Install Options</Link>

      <Button kind="hollow-neutral" href={`/connectors/configure/${uuid}`} onClick={onClick} className={styles.skip}>Skip to Configure</Button>
    </div>
  )
}

DownloadButtons.propTypes    = propTypes

export default DownloadButtons
