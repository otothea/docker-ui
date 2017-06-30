import axios from 'lib/axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'
import BaseStore from 'stores/BaseStore'

export default class Networks extends BaseStore {
  @observable networks = []

  constructor(appStore) {
    super()

    this.appStore = appStore
  }

  @action createNetwork = async network => {
    this.setError()

    try {
      await axios.post('networks', network)
      this.loadNetworks()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action destroyNetwork = async id => {
    this.setError()

    try {
      await axios.delete(`networks/${id}`)
      this.loadNetworks()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action inspectNetwork = async id => {
    this.setError()

    try {
      const res = await axios.get(`networks/${id}`)
      this.inspect = res.data
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action loadNetworks = async () => {
    this.setError()

    try {
      const res = await axios.get('networks')
      this.networks = sortBy(res.data, network => network.Name.toLowerCase()).map(network => ({
        id: network.Id.substr(0, 12),
        id_full: network.Id,
        name: network.Name,
        driver: network.Driver,
        scope: network.Scope,
      }))
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action pruneNetworks = async () => {
    this.setError()

    try {
      await axios.post('networks/prune')
      this.loadNetworks()
    }
    catch(e) {
      this.setError(e)
    }
  }
}
