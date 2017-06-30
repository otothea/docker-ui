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

  closeInspector = () => {
    this.volumesStore.closeInspector()
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

  render() {
    const {error, inspect, volumes} = this.volumesStore

    return (
      <div className="Volumes">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form className="form-inline" onSubmit={this.createVolume}>
          <div className="form-group">
            <input className="form-control" type="text" name="name" value={this.state.volume.name} onChange={this.onChange} />
          </div>
          <button type="submit" className="btn btn-default">Create</button>
        </form>
        <div className="table-responsive">
          <table className="table">
            <thead>
            <tr>
              <th>Driver</th>
              <th>Name</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {volumes.map((volume, i) => (
              <tr key={i}>
                <td title={volume.driver}>{volume.driver}</td>
                <td title={volume.name}><a href="#" onClick={e => this.inspectVolume(e, volume.name)}>{volume.name}</a></td>
                <td>
                  <div className="dropdown pull-right">
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <span className="glyphicon glyphicon-cog" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li><a href="#" onClick={() => this.destroyVolume(volume.name)}>Delete</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="modal fade in" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: inspect ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" aria-label="Close" onClick={this.closeInspector}><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Inspect Volume</h4>
              </div>
              <div className="modal-body">
                <pre><code>{JSON.stringify(inspect, undefined, 2)}</code></pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.closeInspector}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
