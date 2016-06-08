import React, { Component, PropTypes } from 'react';
import {
  Spinner,
  ErrorState,
} from 'zooid-ui';

import {
  fetchOctobluUser,
  getAuthenticationUri,
  removeCookie,
} from '../helpers/authentication';

class OctobluOauth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octobluUser: null,
      error: null,
    };
  }

  componentDidMount() {
    fetchOctobluUser((error, octobluUser) => {
      this.setState({ error, octobluUser });
      if (error) return removeCookie();
      if (!octobluUser) {
        removeCookie()
        this.redirectToLogin();
        return;
      }
    });
  }

  redirectToLogin() {
    window.location = getAuthenticationUri();
  }

  render() {
    const { octobluUser, error } = this.state;
    if (error) return <ErrorState description={error.message} />;
    if (!octobluUser) return <Spinner size="large" />;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

OctobluOauth.propTypes = {
  children: PropTypes.element.isRequired,
}

export default OctobluOauth
