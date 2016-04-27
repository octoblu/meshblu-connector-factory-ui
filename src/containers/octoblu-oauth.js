import React, { Component } from 'react'
import url from 'url'

import {
  Button,
  Spinner,
  ErrorState
} from 'zooid-ui'

import {
  fetchOctobluUser,
  getAuthenticationUri
} from '../helpers/authentication'

export default class OctobluOauth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octobluUser: null,
      error: null
    }
  }

  componentDidMount() {
    fetchOctobluUser((error, octobluUser) => {
      this.setState({error, octobluUser})
      if(error) return
      if(!octobluUser) return this.redirectToLogin()
    })
  }

  redirectToLogin() {
    window.location = getAuthenticationUri()
  }

  render() {
    const { octobluUser, error } = this.state
    if (error) return <ErrorState description={error.message} />
    if (!octobluUser) return <Spinner size="large"/>
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
