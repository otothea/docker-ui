import axios from 'lib/axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'
import moment from 'moment'

const sizeOf = bytes => {
  if (Number(bytes) === 0) { return '0.00 B' }
  const e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B'
}

export default class Images {
  @observable error = null
  @observable images = []
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

  @action destroyImage = async id => {
    this.setError()

    try {
      await axios.delete(`images/${id}`)
      this.loadImages()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action inspectImage = async id => {
    this.setError()

    try {
      const res = await axios.get(`images/${id}`)
      this.inspect = res.data
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action loadImages = async () => {
    this.setError()

    try {
      const res = await axios.get('images')
      this.images = sortBy(res.data, image => -image.Created).map(image => ({
        repository: image.RepoTags ? image.RepoTags[0].split(':')[0] : image.RepoDigests ? image.RepoDigests[0].split('@')[0] : '<none>',
        tag: image.RepoTags ? image.RepoTags[0].split(':')[1] : '<none>',
        image: image.Id.split(':')[1].substr(0, 12),
        image_full: image.Id.split(':')[1],
        created: moment.unix(image.Created).fromNow(),
        size: sizeOf(image.Size),
      }))
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action pruneImages = async () => {
    this.setError()

    try {
      axios.post('images/prune')
      this.loadImages()
    }
    catch(e) {
      this.setError(e)
    }
  }
}
