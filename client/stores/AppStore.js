import Containers from './Containers/Containers'
import Images from './Images/Images'
import Volumes from './Volumes/Volumes'

export default class AppStore {
  constructor() {
    this.containers = new Containers(this)
    this.images = new Images(this)
    this.volumes = new Volumes(this)
  }
}
