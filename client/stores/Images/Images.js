import axios from 'lib/axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'
import moment from 'moment'
import BaseStore from 'stores/BaseStore'

const sizeOf = bytes => {
  if (Number(bytes) === 0) { return '0.00 B' }
  const e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B'
}

export default class Images extends BaseStore {
  @observable images = []

  constructor(appStore) {
    super()

    this.appStore = appStore
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
      this.images = sortBy(res.data, image => -image.Created).reduce((a, image) => {
        const id_full = image.Id.split(':')[1]
        const id = id_full.substr(0, 12)
        const created = moment.unix(image.Created).fromNow()
        const size = sizeOf(image.Size)

        if (image.RepoTags && image.RepoTags.length) {
          image.RepoTags.forEach(repo => {
            const name = repo.split(':')[0] || '<none>'
            const tag  = repo.split(':')[1] || '<none>'

            a.push({
              repository: name,
              tag: tag,
              image: id,
              image_full: id_full,
              created: created,
              size: size,
            })
          })
        }
        else if (image.RepoDigests && image.RepoDigests.length) {
          image.RepoDigests.forEach(repo => {
            const name = repo.split('@')[0] || '<none>'

            a.push({
              repository: name,
              tag: '<none>',
              image: id,
              image_full: id_full,
              created: created,
              size: size,
            })
          })
        }
        else {
          a.push({
            repository: '<none>',
            tag: '<none>',
            image: id,
            image_full: id_full,
            created: created,
            size: size,
          })
        }
        return a
      }, [])
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
