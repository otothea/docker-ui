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

  pruneContainers = () => {
    if (confirm('Are you sure you want to delete stopped containers?')) {
      this.containersStore.pruneContainers()
    }
  }

  renameContainer = container => {
    const name = prompt('What would you like the new name to be?', container.names)

    if (name) {
      this.containersStore.renameContainer(container.id, name)
    }
  }

  render() {
    return (
      <div className="Containers">
        <div className="master-detail">
          <div className="master">
            <h1>CONTAINERS</h1>
            {this.containersStore.error && <div className='error'>{this.containersStore.error}</div>}
            <table>
              <thead>
              <tr>
                <th>Container ID</th>
                <th>Image</th>
                <th>Command</th>
                <th>Created</th>
                <th>Status</th>
                <th>Ports</th>
                <th>Names</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.containersStore.containers.map((container, i) => (
                <tr key={i}>
                  <td title={container.id}><a href="#" onClick={e => this.inspectContainer(e, container.id)}>{container.id}</a></td>
                  <td title={container.image}>{container.image}</td>
                  <td title={container.command}>{container.command}</td>
                  <td title={container.created}>{container.created}</td>
                  <td title={container.status}>{container.status}</td>
                  <td title={container.ports}>{container.ports}</td>
                  <td title={container.names}>{container.names}</td>
                  <td>
                    <button onClick={() => this.destroyContainer(container.id)}>Delete</button>
                    <button onClick={() => this.renameContainer(container)}>Rename</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <button onClick={() => this.pruneContainers()}>Delete all stopped containers</button>
          </div>
          {this.containersStore.inspect && <div className="detail">
            <pre>{JSON.stringify(this.containersStore.inspect, undefined, 2)}</pre>
          </div>}
        </div>
      </div>
    )
  }
}
