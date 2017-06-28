import axios from 'axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'
import moment from 'moment'

export default class Containers {
  @observable error = null
  @observable containers = []
  @observable inspect = null

  constructor(appStore) {
    this.appStore = appStore
  }

  @action setError = message => {
    this.error = message
  }

  @action destroyContainer = id => {
    this.setError(null)

    axios.delete(`/api/v1/containers/${id}`)
    .then(() => {
      this.loadContainers()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action inspectContainer = id => {
    this.setError(null)

    axios.get(`/api/v1/containers/${id}`)
    .then(res => {
      this.inspect = res.data
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action loadContainers = () => {
    this.setError(null)

    axios.get('/api/v1/containers')
    .then(res => {
      this.containers = sortBy(res.data, container => -container.Created).map(container => ({
        id: container.Id.substr(0, 12),
        image: container.Image,
        command: container.Command.length > 20 ? `${container.Command.substr(0, 17)}...` : container.Command,
        created: moment.unix(container.Created).fromNow(),
        status: container.Status,
        ports: container.Ports.map(p => `${(p.IP || '') && `${p.IP || ''}:${p.PublicPort || ''}->`}${p.PrivatePort}/${p.Type}`).join(', '),
        names: container.Names.map(name => name.slice(1)).join(', '),
        state: container.State,
      }))
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action pruneContainers = () => {
    this.setError(null)

    axios.post('/api/v1/containers/prune')
    .then(() => {
      this.loadContainers()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action renameContainer = (id, name) => {
    this.setError(null)

    axios.put(`/api/v1/containers/${id}/rename`, {name: name})
    .then(() => {
      this.loadContainers()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action restartContainer = id => {
    this.setError(null)

    axios.put(`/api/v1/containers/${id}/restart`, {name: name})
    .then(() => {
      this.loadContainers()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action startContainer = id => {
    this.setError(null)

    axios.put(`/api/v1/containers/${id}/start`, {name: name})
    .then(() => {
      this.loadContainers()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }

  @action stopContainer = id => {
    this.setError(null)

    axios.put(`/api/v1/containers/${id}/stop`, {name: name})
    .then(() => {
      this.loadContainers()
    })
    .catch(err => {
      this.setError(err.response.data.message)
    })
  }
}
