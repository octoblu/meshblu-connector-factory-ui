import React, { Component } from 'react'
import OctobluOauth from './octoblu-oauth'

export default class App extends Component {
  render() {
    return (
      <OctobluOauth>
        <h1>Connector Factory</h1>
        {this.props.children}
      </OctobluOauth>
    )
  }
}
