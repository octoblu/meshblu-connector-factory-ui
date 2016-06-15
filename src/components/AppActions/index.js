import React from 'react';
import { Link } from 'react-router'

const AppActions = () => {
  return (
    <ul>
      <li><Link to="/things/my" className="Button Button--no-style">My Things</Link></li>
      <li>|</li>
      <li><Link to="/things/all" className="Button Button--no-style">All Things</Link></li>
      <li>|</li>
      <li><Link to="/getting-started" className="Button Button--no-style">Getting Started</Link></li>
    </ul>
  )
};

export default AppActions;
