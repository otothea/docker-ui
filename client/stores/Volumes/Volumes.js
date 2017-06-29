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

  @action setError = (err = null) => {
    this.error = (((err || {}).response || {}).data || {}).message || null
  }

  @action createVolume = volume => {
    this.setError()

    axios.post('/api/v1/volumes', volume)
    .then(() => {
      this.loadVolumes()
    })
    .catch(this.setError)
  }

  @action destroyVolume = id => {
    this.setError()

    axios.delete(`/api/v1/volumes/${id}`)
    .then(() => {
      this.loadVolumes()
    })
    .catch(this.setError)
  }

  @action inspectVolume = id => {
    this.setError()

    axios.get(`/api/v1/volumes/${id}`)
    .then(res => {
      this.inspect = res.data
    })
    .catch(this.setError)
  }

  @action loadVolumes = () => {
    this.setError()

    axios.get('/api/v1/volumes')
    .then(res => {
      this.volumes = sortBy(res.data, volume => volume.Name.toLowerCase()).map(volume => ({
        driver: volume.Driver,
        name: volume.Name,
      }))
    })
    .catch(this.setError)
  }

  @action pruneVolumes = () => {
    this.setError()

    axios.post('/api/v1/volumes/prune')
    .then(() => {
      this.loadVolumes()
    })
    .catch(this.setError)
  }
}
