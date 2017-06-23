import React from 'react'
import axios from 'axios'
import moment from 'moment'

const COLUMNS = ['Container ID', 'Image', 'Command', 'Created', 'Status', 'Ports', 'Names']

export default class Containers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      containers: [],
    }
  }

  componentDidMount() {
    this.loadContainers()
  }

  loadContainers = () => {
    axios.get('/api/v1/containers').then(res => {
      this.setState({
        containers: res.data.map(container => [
          container.Id.substr(0, 12),
          container.Image,
          container.Command.length > 20 ? `${container.Command.substr(0, 17)}...` : container.Command,
          moment.unix(container.Created).fromNow(),
          container.Status,
          container.Ports.map(p => `${(p.IP || '') && `${p.IP || ''}:${p.PublicPort || ''}->`}${p.PrivatePort}/${p.Type}`).join(', '),
          container.Names.map(name => name.slice(1)).join(', '),
        ]),
      })
    })
  }

  render() {
    return (
      <div className="Containers">
        <h1>CONTAINERS</h1>
        <table>
          <thead>
          <tr>
            {COLUMNS.map((column, i) => <th key={i}>{column}</th>)}
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.containers.map((item, i) => (
            <tr key={i}>
              {item.map((value, k) => (
                <td key={k} title={value}>{value}</td>
              ))}
              <td />
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}
