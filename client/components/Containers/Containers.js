import {inject, observer} from 'mobx-react'
import React from 'react'
import AppStore from 'stores/AppStore'

@inject('store')
@observer
export default class Containers extends React.Component {
  props: {
    store: AppStore;
  }

  constructor(props) {
    super(props)

    this.appStore = props.store
    this.containersStore = this.appStore.containers
  }

  componentDidMount() {
    this.loadContainers()
  }

  destroyContainer = id => {
    if (confirm(`Are you sure you want to delete container ${id}`)) {
      this.containersStore.destroyContainer(id)
    }
  }

  inspectContainer = (e, id) => {
    e.preventDefault()

    this.containersStore.inspectContainer(id)
  }

  loadContainers = () => {
    this.containersStore.loadContainers()
  }

  pauseContainer = id => {
    if (confirm(`Are you sure you want to pause container ${id}?`)) {
      this.containersStore.pauseContainer(id)
    }
  }

  unpauseContainer = id => {
    if (confirm(`Are you sure you want to unpause container ${id}?`)) {
      this.containersStore.unpauseContainer(id)
    }
  }

  renameContainer = container => {
    const name = prompt('What would you like the new name to be?', container.names)

    if (name) {
      this.containersStore.renameContainer(container.id, name)
    }
  }

  restartContainer = id => {
    if (confirm(`Are you sure you want to restart container ${id}?`)) {
      this.containersStore.restartContainer(id)
    }
  }

  startContainer = id => {
    if (confirm(`Are you sure you want to start container ${id}?`)) {
      this.containersStore.startContainer(id)
    }
  }

  stopContainer = id => {
    if (confirm(`Are you sure you want to stop container ${id}?`)) {
      this.containersStore.stopContainer(id)
    }
  }

  killContainer = id => {
    if (confirm(`Are you sure you want to kill container ${id}?`)) {
      this.containersStore.killContainer(id)
    }
  }

  render() {
    const {containers, error, inspect} = this.containersStore

    return (
      <div className="Containers">
        <div className="master-detail">
          <div className="master">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th>Container ID</th>
                  <th>Image</th>
                  <th>Command</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Ports</th>
                  <th>Names</th>
                  <th />
                </tr>
                </thead>
                <tbody>
                {containers.map((container, i) => (
                  <tr key={i}>
                    <td title={container.id_full}><a href="#" onClick={e => this.inspectContainer(e, container.id)}>{container.id}</a></td>
                    <td title={container.image}>{container.image}</td>
                    <td title={container.command_full}>{container.command}</td>
                    <td title={container.created}>{container.created}</td>
                    <td title={container.status}>{container.status}</td>
                    <td title={container.ports_full}>{container.ports}</td>
                    <td title={container.names_full}>{container.names}</td>
                    <td>
                      <div className="dropdown pull-right">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <span className="glyphicon glyphicon-cog" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right">
                          {container.state === 'exited' && <li><a href="#" onClick={() => this.startContainer(container.id)}>Start</a></li>}
                          {container.state === 'exited' && <li><a href="#" onClick={() => this.destroyContainer(container.id)}>Delete</a></li>}
                          {container.state === 'running' && <li><a href="#" onClick={() => this.restartContainer(container.id)}>Restart</a></li>}
                          {container.state === 'running' && <li><a href="#" onClick={() => this.stopContainer(container.id)}>Stop</a></li>}
                          {container.state === 'running' && <li><a href="#" onClick={() => this.killContainer(container.id)}>Kill</a></li>}
                          {container.state === 'running' && <li><a href="#" onClick={() => this.pauseContainer(container.id)}>Pause</a></li>}
                          {container.state === 'paused' && <li><a href="#" onClick={() => this.unpauseContainer(container.id)}>Unpause</a></li>}
                          <li><a href="#" onClick={() => this.renameContainer(container)}>Rename</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          {inspect && <div className="detail">
            <pre>{JSON.stringify(inspect, undefined, 2)}</pre>
          </div>}
        </div>
      </div>
    )
  }
}
