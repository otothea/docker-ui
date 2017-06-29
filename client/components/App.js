import {inject} from 'mobx-react'
import React from 'react'
import activeComponent from 'react-router-active-component'
import AppStore from 'stores/AppStore'

import './App.scss'

const Li = activeComponent('li')

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
    this.containersStore = this.appStore.containers
    this.imagesStore = this.appStore.images
    this.volumesStore = this.appStore.volumes
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

  render() {
    const route = this.props.routes[this.props.routes.length - 1].path

    let button
    switch(route) {
    case 'images':
      button = <button type="button" className="btn btn-danger" onClick={() => this.pruneImages()}>Delete all unused images</button>
      break
    case 'containers':
      button = <button type="button" className="btn btn-danger" onClick={() => this.pruneContainers()}>Delete all stopped containers</button>
      break
    case 'volumes':
      button = <button type="button" className="btn btn-danger" onClick={() => this.pruneVolumes()}>Delete all unused volumes</button>
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
                <Li to="/images">Images</Li>
                <Li to="/containers">Containers</Li>
                <Li to="/volumes">Volumes</Li>
              </ul>
              <form className="navbar-form navbar-right">
                {button}
              </form>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
