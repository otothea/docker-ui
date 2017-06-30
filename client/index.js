import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import AppStore from './stores/AppStore'

require('babel-polyfill')

ReactDOM.render(
  <Router store={new AppStore()} />,
  document.getElementById('app')
)
