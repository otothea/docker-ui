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
    this.setError(null)

    axios.post('/api/v1/volumes', volume)
    .then(() => {
      this.loadVolumes()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action destroyVolume = id => {
    this.setError(null)

    axios.delete(`/api/v1/volumes/${id}`)
    .then(() => {
      this.loadVolumes()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action inspectVolume = id => {
    this.setError(null)

    axios.get(`/api/v1/volumes/${id}`)
    .then(res => {
      this.inspect = res.data
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action loadVolumes = () => {
    this.setError(null)

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
    this.setError(null)

    axios.post('/api/v1/volumes/prune')
    .then(() => {
      this.loadVolumes()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }
}
