import React from 'react'
import axios from 'axios'
import {sortBy} from 'lodash'

export default class Volumes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      volumes: [],
      volume: {
        name: '',
      },
      inspect: null,
    }
  }

  componentDidMount() {
    this.loadVolumes()
  }

  createVolume = e => {
    e.preventDefault()

    axios.post('/api/v1/volumes', this.state.volume).then(() => {
      this.loadVolumes()
    })
  }

  destroyVolume = id => {
    if (confirm(`Are you sure you want to delete volume ${id}?`)) {
      axios.delete(`/api/v1/volumes/${id}`).then(() => {
        this.loadVolumes()
      })
    }
  }

  loadVolumes = () => {
    axios.get('/api/v1/volumes').then(res => {
      this.setState({
        volumes: sortBy(res.data, volume => volume.Name.toLowerCase()).map(volume => ({
          driver: volume.Driver,
          name: volume.Name,
        })),
      })
    })
  }

  inspectVolume = (e, id) => {
    e.preventDefault()

    axios.get(`/api/v1/volumes/${id}`).then(res => {
      this.setState({
        inspect: res.data,
      })
    })
  }

  onChange = e => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    this.setState({
      volume: Object.assign({}, this.state.volume, {
        [name]: value,
      }),
    })
  }

  pruneVolumes = () => {
    if (confirm('Are you sure you want to delete unused volumes?')) {
      axios.post('/api/v1/volumes/prune').then(() => {
        this.loadVolumes()
      })
    }
  }

  render() {
    return (
      <div className="Volumes">
        <h1>VOLUMES</h1>
        <form onSubmit={this.createVolume}>
          <input name="name" value={this.state.volume.name} onChange={this.onChange} />
          <input type="submit" value="Create" />
        </form>
        <div className="master-detail">
          <div className="master">
            <table>
              <thead>
              <tr>
                <th>Driver</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.volumes.map((volume, i) => (
                <tr key={i}>
                  <td title={volume.driver}>{volume.driver}</td>
                  <td title={volume.name}><a href="#" onClick={e => this.inspectVolume(e, volume.name)}>{volume.name}</a></td>
                  <td>
                    <button onClick={() => this.destroyVolume(volume.name)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <button onClick={() => this.pruneVolumes()}>Delete all unused volumes</button>
          </div>
          {this.state.inspect && <div className="detail">
            <pre>{JSON.stringify(this.state.inspect, undefined, 2)}</pre>
          </div>}
        </div>
      </div>
    )
  }
}
