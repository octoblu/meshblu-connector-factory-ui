import React, { PropTypes } from 'react'
import styles from './styles.css'

const propTypes = {
  otp: PropTypes.string.isRequired,
}

const OTP = ({ otp = '...' }) => {
  return (
    <div className={styles.box}>
      <h4>Your One Time Password</h4>
      <pre><code className={styles.key}>{otp}</code></pre>
    </div>
  )
}

OTP.propTypes = propTypes

export default OTP
