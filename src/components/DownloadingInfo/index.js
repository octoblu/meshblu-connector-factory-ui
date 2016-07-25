import React, { PropTypes } from 'react'
import Button from 'zooid-button'

import styles from './styles.css'

const propTypes = {
  onClickNext: PropTypes.func.isRequired,
  uuid:        PropTypes.string.isRequired,
}

const DownloadingInfo = ({uuid, onClickNext}) => {
  const onClick = (event) => {
    event.preventDefault()
    onClickNext({uuid})
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.explanation}>
        Your download will begin shortly. Once the
        download has completed, run through the install process,
        then click next to configure the device
      </p>
      <Button kind="primary" href={`/connectors/configure/${uuid}`} onClick={onClick} className={styles.next}>Next: Configure</Button>
    </div>
  )
}

DownloadingInfo.propTypes = propTypes

export default DownloadingInfo
