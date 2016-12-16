import React, { PropTypes } from 'react'
import styles from './styles.css'

const propTypes = {
  otp: PropTypes.string.isRequired,
}

const defaultProps = {
  otp: '...',
}

const OneTimePassword = ({ otp }) => {
  return (
    <div className={styles.wrapper}>
      <h4>Your One Time Password</h4>
      <pre className={styles.box}><code className={styles.key}>{otp}</code></pre>
    </div>
  )
}

OneTimePassword.propTypes = propTypes
OneTimePassword.defaultProps = defaultProps

export default OneTimePassword
