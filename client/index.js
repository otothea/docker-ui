import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import AppStore from './stores/AppStore'

ReactDOM.render(
  <Router store={new AppStore()} />,
  document.getElementById('app')
)
