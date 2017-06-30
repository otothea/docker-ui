import {action, observable} from 'mobx'

export default class BaseStore {
  @observable error = null
  @observable inspect = null

  @action setError = (err = null) => {
    console.log(((err || {}).response || {}).data)
    this.error = (((err || {}).response || {}).data || {}).message || (err || {}).message || err
  }

  @action closeInspector = () => {
    this.inspect = null
  }
}
