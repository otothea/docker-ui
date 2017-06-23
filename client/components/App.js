import React from 'react'
import {Link} from 'react-router'

import './App.scss'

export default class App extends React.Component {
  props: {
    children: *;
  }

  render() {
    return (
      <div className="App">
        <ul>
          <li><Link to="/images">IMAGES</Link></li>
          <li><Link to="/containers">CONTAINERS</Link></li>
          <li><Link to="/volumes">VOLUMES</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
