import axios from 'axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'
import moment from 'moment'

const ellipsify = string => {
  return string.length > 40 ? `${string.substr(0, 37)}...` : string
}

export default class Containers {
  @observable error = null
  @observable containers = []
  @observable inspect = null

  constructor(appStore) {
    this.appStore = appStore
  }

  @action setError = (err = null) => {
    this.error = (((err || {}).response || {}).data || {}).message || err
  }

  @action destroyContainer = id => {
    this.setError()

    axios.delete(`/api/v1/containers/${id}`)
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action inspectContainer = id => {
    this.setError()

    axios.get(`/api/v1/containers/${id}`)
    .then(res => {
      this.inspect = res.data
    })
    .catch(this.setError)
  }

  @action loadContainers = () => {
    this.setError()

    axios.get('/api/v1/containers')
    .then(res => {
      this.containers = sortBy(res.data, container => -container.Created).map(container => {
        const ports = container.Ports.map(p => `${(p.IP || '') && `${p.IP || ''}:${p.PublicPort || ''}->`}${p.PrivatePort}/${p.Type}`).join(', ')
        const names = container.Names.map(name => name.slice(1)).join(', ')

        return {
          id: container.Id.substr(0, 12),
          id_full: container.Id,
          image: container.Image,
          command: ellipsify(container.Command),
          command_full: container.Command,
          created: moment.unix(container.Created).fromNow(),
          status: container.Status,
          ports: ellipsify(ports),
          ports_full: ports,
          names: ellipsify(names),
          names_full: names,
          state: container.State,
        }
      })
    })
    .catch(this.setError)
  }

  @action pruneContainers = () => {
    this.setError()

    axios.post('/api/v1/containers/prune')
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action renameContainer = (id, name) => {
    this.setError()

    axios.put(`/api/v1/containers/${id}/rename`, {name: name})
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action restartContainer = id => {
    this.setError()

    axios.put(`/api/v1/containers/${id}/restart`)
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action startContainer = id => {
    this.setError()

    axios.put(`/api/v1/containers/${id}/start`)
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action stopContainer = id => {
    this.setError()

    axios.put(`/api/v1/containers/${id}/stop`)
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action killContainer = id => {
    this.setError()

    axios.put(`/api/v1/containers/${id}/kill`)
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action pauseContainer = id => {
    this.setError()

    axios.put(`/api/v1/containers/${id}/pause`)
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }

  @action unpauseContainer = id => {
    this.setError()

    axios.put(`/api/v1/containers/${id}/unpause`)
    .then(() => {
      this.loadContainers()
    })
    .catch(this.setError)
  }
}
