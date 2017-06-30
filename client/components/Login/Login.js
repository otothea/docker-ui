import {inject, observer} from 'mobx-react'
import React from 'react'
import AppStore from 'stores/AppStore'

@inject('store')
@observer
export default class Login extends React.Component {
  props: {
    store: AppStore;
  }

  constructor(props) {
    super(props)

    this.state = {
      credentials: {
        user: '',
        pass: '',
      },
    }

    this.appStore = props.store
    this.loginStore = this.appStore.login
  }

  login = e => {
    e.preventDefault()

    this.loginStore.login(this.state.credentials)
  }

  onChange = e => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    this.setState({
      credentials: Object.assign({}, this.state.credentials, {
        [name]: value,
      }),
    })
  }

  render() {
    const error = this.loginStore.error
    const {pass, user} = this.state.credentials

    return (
      <div className="container">
        <h1>Log in</h1>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="user">Username</label>
            <input id="user" type="text" className="form-control" name="user" value={user} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input id="pass" type="password" className="form-control" name="pass" value={pass} onChange={this.onChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    )
  }
}
