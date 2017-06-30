import axios from 'lib/axios'
import {action} from 'mobx'
import {browserHistory} from 'react-router'
import BaseStore from 'stores/BaseStore'

export default class Login extends BaseStore {
  constructor(appStore) {
    super()

    this.appStore = appStore
  }

  @action login = async credentials => {
    this.setError()

    try {
      await axios.post('auth', credentials)
      const redirect = browserHistory.getCurrentLocation().query.redirect
      window.location = redirect || '/'
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action logout = async () => {
    this.setError()

    try {
      await axios.delete('auth')
      window.location = '/login'
    }
    catch(e) {
      this.setError(e)
    }
  }
}

