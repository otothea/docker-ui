import axios from 'lib/axios'
import {action, observable} from 'mobx'
import {browserHistory} from 'react-router'

export default class Login {
  @observable error = null

  constructor(appStore) {
    this.appStore = appStore
  }

  @action setError = (err = null) => {
    this.error = (((err || {}).response || {}).data || {}).message || err
  }

  @action login = credentials => {
    this.setError()

    axios.post('auth', credentials)
    .then(() => {
      const redirect = browserHistory.getCurrentLocation().query.redirect
      browserHistory.push(redirect || '/')
    })
    .catch(this.setError)
  }

  @action logout = () => {
    this.setError()

    axios.delete('auth')
    .then(() => {
      browserHistory.push('/login')
    })
    .catch(this.setError)
  }
}

