import axios from 'axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'

export default class Networks {
  @observable error = null
  @observable networks = []
  @observable inspect = null

  constructor(appStore) {
    this.appStore = appStore
  }

  @action setError = (err = null) => {
    this.error = (((err || {}).response || {}).data || {}).message || err
  }

  @action createNetwork = network => {
    this.setError()

    axios.post('/api/v1/networks', network)
    .then(() => {
      this.loadNetworks()
    })
    .catch(this.setError)
  }

  @action destroyNetwork = id => {
    this.setError()

    axios.delete(`/api/v1/networks/${id}`)
    .then(() => {
      this.loadNetworks()
    })
    .catch(this.setError)
  }

  @action inspectNetwork = id => {
    this.setError()

    axios.get(`/api/v1/networks/${id}`)
    .then(res => {
      this.inspect = res.data
    })
    .catch(this.setError)
  }

  @action loadNetworks = () => {
    this.setError()

    axios.get('/api/v1/networks')
    .then(res => {
      this.networks = sortBy(res.data, network => network.Name.toLowerCase()).map(network => ({
        id: network.Id.substr(0, 12),
        id_full: network.Id,
        name: network.Name,
        driver: network.Driver,
        scope: network.Scope,
      }))
    })
    .catch(this.setError)
  }

  @action pruneNetworks = () => {
    this.setError()

    axios.post('/api/v1/networks/prune')
    .then(() => {
      this.loadNetworks()
    })
    .catch(this.setError)
  }
}
