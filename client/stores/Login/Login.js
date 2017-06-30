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

  @action login = async credentials => {
    this.setError()

    try {
      await axios.post('auth', credentials)
      const redirect = browserHistory.getCurrentLocation().query.redirect
      browserHistory.push(redirect || '/')
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action logout = async () => {
    this.setError()

    try {
      await axios.delete('auth')
      browserHistory.push('/login')
    }
    catch(e) {
      this.setError(e)
    }
  }
}

