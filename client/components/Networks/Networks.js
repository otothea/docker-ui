import {inject, observer} from 'mobx-react'
import React from 'react'
import AppStore from 'stores/AppStore'

@inject('store')
@observer
export default class Networks extends React.Component {
  props: {
    store: AppStore;
  }

  constructor(props) {
    super(props)

    this.state = {
      network: {
        name: '',
      },
    }

    this.appStore = props.store
    this.networksStore = this.appStore.networks
  }

  componentDidMount() {
    this.loadNetworks()
  }

  createNetwork = e => {
    e.preventDefault()

    this.networksStore.createNetwork(this.state.network)
  }

  destroyNetwork = id => {
    if (confirm(`Are you sure you want to delete network ${id}?`)) {
      this.networksStore.destroyNetwork(id)
    }
  }

  inspectNetwork = (e, id) => {
    e.preventDefault()

    this.networksStore.inspectNetwork(id)
  }

  loadNetworks = () => {
    this.networksStore.loadNetworks()
  }

  onChange = e => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    this.setState({
      network: Object.assign({}, this.state.network, {
        [name]: value,
      }),
    })
  }

  render() {
    const {error, inspect, networks} = this.networksStore

    return (
      <div className="Networks">
        <div className="master-detail">
          <div className="master">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form className="form-inline" onSubmit={this.createNetwork}>
              <div className="form-group">
                <input className="form-control" type="text" name="name" value={this.state.network.name} onChange={this.onChange} />
              </div>
              <button type="submit" className="btn btn-default">Create</button>
            </form>
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th>Network ID</th>
                  <th>Name</th>
                  <th>Driver</th>
                  <th>Scope</th>
                  <th />
                </tr>
                </thead>
                <tbody>
                {networks.map((network, i) => (
                  <tr key={i}>
                    <td title={network.id}>{network.id}</td>
                    <td title={network.name}><a href="#" onClick={e => this.inspectNetwork(e, network.id)}>{network.name}</a></td>
                    <td title={network.driver}>{network.driver}</td>
                    <td title={network.scope}>{network.scope}</td>
                    <td>
                      <div className="dropdown pull-right">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <span className="glyphicon glyphicon-cog" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-right">
                          <li><a href="#" onClick={() => this.destroyNetwork(network.id)}>Delete</a></li>
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
