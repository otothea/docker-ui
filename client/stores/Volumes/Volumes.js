import axios from 'axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'

export default class Volumes {
  @observable error = null
  @observable volumes = []
  @observable inspect = null

  constructor(appStore) {
    this.appStore = appStore
  }

  @action setError = message => {
    this.error = message
  }

  @action createVolume = volume => {
    axios.post('/api/v1/volumes', volume)
    .then(() => {
      this.loadVolumes()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action destroyVolume = id => {
    axios.delete(`/api/v1/volumes/${id}`)
    .then(() => {
      this.loadVolumes()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action inspectVolume = id => {
    axios.get(`/api/v1/volumes/${id}`)
    .then(res => {
      this.inspect = res.data
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action loadVolumes = () => {
    axios.get('/api/v1/volumes')
    .then(res => {
      this.volumes = sortBy(res.data, volume => volume.Name.toLowerCase()).map(volume => ({
        driver: volume.Driver,
        name: volume.Name,
      }))
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action pruneVolumes = () => {
    axios.post('/api/v1/volumes/prune')
    .then(() => {
      this.loadVolumes()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }
}
