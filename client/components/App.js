import {inject} from 'mobx-react'
import React from 'react'
import {Link} from 'react-router'
import AppStore from 'stores/AppStore'

import './App.scss'

@inject('store')
export default class App extends React.Component {
  props: {
    children: *;
    routes: *;
    store: AppStore;
  }

  constructor(props) {
    super(props)

    this.appStore = props.store
    this.loginStore = this.appStore.login
    this.containersStore = this.appStore.containers
    this.imagesStore = this.appStore.images
    this.volumesStore = this.appStore.volumes
    this.networksStore = this.appStore.networks
  }

  logout = () => {
    if (confirm('Are you sure you want to log out?')) {
      this.loginStore.logout()
    }
  }

  pruneContainers = () => {
    if (confirm('Are you sure you want to delete stopped containers?')) {
      this.containersStore.pruneContainers()
    }
  }

  pruneImages = () => {
    if (confirm('Are you sure you want to delete unused images?')) {
      this.imagesStore.pruneImages()
    }
  }

  pruneVolumes = () => {
    if (confirm('Are you sure you want to delete unused volumes?')) {
      this.volumesStore.pruneVolumes()
    }
  }

  pruneNetworks = () => {
    if (confirm('Are you sure you want to delete unused networks?')) {
      this.networksStore.pruneNetworks()
    }
  }

  render() {
    const route = this.props.routes[this.props.routes.length - 1].path

    let button = null,
      images = '',
      containers = '',
      volumes = '',
      networks = ''

    switch(route) {
    case 'images':
      button = <button type="button" className="btn btn-danger btn-sm" onClick={this.pruneImages}>Delete all unused images</button>
      images = 'active'
      break
    case 'containers':
      button = <button type="button" className="btn btn-danger btn-sm" onClick={this.pruneContainers}>Delete all stopped containers</button>
      containers = 'active'
      break
    case 'volumes':
      button = <button type="button" className="btn btn-danger btn-sm" onClick={this.pruneVolumes}>Delete all unused volumes</button>
      volumes = 'active'
      break
    case 'networks':
      button = <button type="button" className="btn btn-danger btn-sm" onClick={this.pruneNetworks}>Delete all unused networks</button>
      networks = 'active'
      break
    }

    return (
      <div className="App">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <span className="navbar-brand">Docker UI</span>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className={images}><Link to="/images">Images</Link></li>
                <li className={containers}><Link to="/containers">Containers</Link></li>
                <li className={volumes}><Link to="/volumes">Volumes</Link></li>
                <li className={networks}><Link to="/networks">Networks</Link></li>
              </ul>
              <form className="navbar-form navbar-left">
                {button}
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" /></a>
                  <ul className="dropdown-menu">
                    <li><a href="#" onClick={this.logout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
