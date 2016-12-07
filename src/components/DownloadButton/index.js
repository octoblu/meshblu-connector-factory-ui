import React, { PropTypes } from 'react'
import styles from './styles.css'
import _ from 'lodash'
import Button from 'zooid-button'
import Spinner from 'zooid-spinner'
import ErrorState from 'zooid-error-state'

const propTypes = {
  downloadURL: PropTypes.string,
  fetchDownloadURL: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onClickDownload: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  otp: PropTypes.string.isRequired,
  os: PropTypes.string,
  arch: PropTypes.string,
}

const OS_MAP   = { darwin: 'macOS', linux: 'Linux', windows: 'Windows' }
const ARCH_MAP = { amd64: 'x64', 386: 'x86', arm: 'ARM' }

const DownloadButton = ({ downloadURL, error, fetchDownloadURL, fetching, onClickDownload, otp, uuid, os, arch }) => {
  const onClick = () => onClickDownload({ otp, uuid })
  const fancyOS = _.get(OS_MAP, os, os)
  const fancyArch = _.get(ARCH_MAP, arch, arch)

  fetchDownloadURL({ downloadURL, error, fetching, otp })

  if (error) {
    return <ErrorState title="Error" description={error.message} />
  }

  if (fetching) {
    return (
      <div className={styles.fetching}>
        <p>Finding the correct installer for you</p>
        <Spinner className={styles.spinner} />
      </div>
    )
  }

  return (
    <div>
      <Button href={downloadURL} onClick={onClick} className={styles.DownloadButton} kind="primary">
        Download for {fancyOS} {fancyArch}
      </Button>
    </div>
  )
}

DownloadButton.propTypes    = propTypes

export default DownloadButton
