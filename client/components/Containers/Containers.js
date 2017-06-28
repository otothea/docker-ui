import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {sortBy} from 'lodash'

export default class Containers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      containers: [],
      inspect: null,
    }
  }

  componentDidMount() {
    this.loadContainers()
  }

  destroyContainer = id => {
    if (confirm(`Are you sure you want to delete container ${id}`)) {
      axios.delete(`/api/v1/containers/${id}`).then(() => {
        this.loadContainers()
      })
    }
  }

  inspectContainer = (e, id) => {
    e.preventDefault()

    axios.get(`/api/v1/containers/${id}`).then(res => {
      this.setState({
        inspect: res.data,
      })
    })
  }

  loadContainers = () => {
    axios.get('/api/v1/containers').then(res => {
      this.setState({
        containers: sortBy(res.data, container => -container.Created).map(container => ({
          id: container.Id.substr(0, 12),
          image: container.Image,
          command: container.Command.length > 20 ? `${container.Command.substr(0, 17)}...` : container.Command,
          created: moment.unix(container.Created).fromNow(),
          status: container.Status,
          ports: container.Ports.map(p => `${(p.IP || '') && `${p.IP || ''}:${p.PublicPort || ''}->`}${p.PrivatePort}/${p.Type}`).join(', '),
          names: container.Names.map(name => name.slice(1)).join(', '),
        })),
      })
    })
  }

  pruneContainers = () => {
    if (confirm('Are you sure you want to delete stopped containers?')) {
      axios.post('/api/v1/containers/prune').then(() => {
        this.loadContainers()
      })
    }
  }

  render() {
    return (
      <div className="Containers">
        <h1>CONTAINERS</h1>
        <div className="master-detail">
          <div className="master">
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
              {this.state.containers.map((container, i) => (
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
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <button onClick={() => this.pruneContainers()}>Delete all stopped containers</button>
          </div>
          {this.state.inspect && <div className="detail">
            <pre>{JSON.stringify(this.state.inspect, undefined, 2)}</pre>
          </div>}
        </div>
      </div>
    )
  }
}
