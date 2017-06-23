import React from 'react'
import {Router as ReactRouter, Route, browserHistory, IndexRedirect} from 'react-router'
import App from './components'
import Images from './components/images/images'
import Containers from './components/containers/containers'
import Volumes from './components/volumes/volumes'

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
