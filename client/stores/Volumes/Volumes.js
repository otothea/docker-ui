import axios from 'lib/axios'
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
    this.error = (((err || {}).response || {}).data || {}).message || err
  }

  @action closeInspector = () => {
    this.inspect = null
  }

  @action createVolume = async volume => {
    this.setError()

    try {
      await axios.post('volumes', volume)
      this.loadVolumes()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action destroyVolume = async id => {
    this.setError()

    try {
      await axios.delete(`volumes/${id}`)
      this.loadVolumes()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action inspectVolume = async id => {
    this.setError()

    try {
      const res = await axios.get(`volumes/${id}`)
      this.inspect = res.data
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action loadVolumes = async () => {
    this.setError()

    try {
      const res = await axios.get('volumes')
      this.volumes = sortBy(res.data, volume => volume.Name.toLowerCase()).map(volume => ({
        driver: volume.Driver,
        name: volume.Name,
      }))
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action pruneVolumes = async () => {
    this.setError()

    try {
      await axios.post('volumes/prune')
      this.loadVolumes()
    }
    catch(e) {
      this.setError(e)
    }
  }
}
