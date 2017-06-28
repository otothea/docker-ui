import {inject, observer} from 'mobx-react'
import React from 'react'
import AppStore from 'stores/AppStore'

@inject('store')
@observer
export default class Volumes extends React.Component {
  props: {
    store: AppStore;
  }

  constructor(props) {
    super(props)

    this.state = {
      volume: {
        name: '',
      },
    }

    this.appStore = props.store
    this.volumesStore = this.appStore.volumes
  }

  componentDidMount() {
    this.loadVolumes()
  }

  createVolume = e => {
    e.preventDefault()

    this.volumesStore.createVolume(this.state.volume)
  }

  destroyVolume = id => {
    if (confirm(`Are you sure you want to delete volume ${id}?`)) {
      this.volumesStore.destroyVolume(id)
    }
  }

  inspectVolume = (e, id) => {
    e.preventDefault()

    this.volumesStore.inspectVolume(id)
  }

  loadVolumes = () => {
    this.volumesStore.loadVolumes()
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
      this.volumesStore.pruneVolumes()
    }
  }

  render() {
    const {error, inspect, volumes} = this.volumesStore

    return (
      <div className="Volumes">
        <div className="master-detail">
          <div className="master">
            <h1>VOLUMES</h1>
            {error && <div className='error'>{error}</div>}
            <form onSubmit={this.createVolume}>
              <input name="name" value={this.state.volume.name} onChange={this.onChange} />
              <input type="submit" value="Create" />
            </form>
            <table>
              <thead>
              <tr>
                <th>Driver</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {volumes.map((volume, i) => (
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
          {inspect && <div className="detail">
            <pre>{JSON.stringify(inspect, undefined, 2)}</pre>
          </div>}
        </div>
      </div>
    )
  }
}
