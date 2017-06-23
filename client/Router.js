import React from 'react'
import {Router as ReactRouter, Route, browserHistory, IndexRedirect} from 'react-router'
import App from './components/App'
import Images from './components/Images/Images'
import Containers from './components/Containers/Containers'
import Volumes from './components/Volumes/Volumes'

export default class Router extends React.Component {
  render() {
    return (
      <ReactRouter history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="images" />
          <Route path="images" component={Images} />
          <Route path="containers" component={Containers} />
          <Route path="volumes" component={Volumes} />
        </Route>
      </ReactRouter>
    )
  }
}
