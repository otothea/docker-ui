import axios from 'lib/axios'
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

  @action closeInspector = () => {
    this.inspect = null
  }

  @action destroyContainer = async id => {
    this.setError()

    try {
      await axios.delete(`containers/${id}`)
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action inspectContainer = async id => {
    this.setError()

    try {
      const res = await axios.get(`containers/${id}`)
      this.inspect = res.data
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action loadContainers = async () => {
    this.setError()

    try {
      const res = await axios.get('containers')
      this.containers = sortBy(res.data, container => -container.Created).map(container => {
        const ports = sortBy(container.Ports, p => `${p.PrivatePort}/${p.Type}`).map(p => `${(p.IP || '') && `${p.IP || ''}:${p.PublicPort || ''}->`}${p.PrivatePort}/${p.Type}`).join(', ')
        const names = sortBy(container.Names, n => n.toLowerCase()).map(n => n.slice(1)).join(', ')

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
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action pruneContainers = async () => {
    this.setError()

    try {
      await axios.post('containers/prune')
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action renameContainer = async (id, name) => {
    this.setError()

    try {
      await axios.put(`containers/${id}/rename`, {name: name})
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action restartContainer = async id => {
    this.setError()

    try {
      await axios.put(`containers/${id}/restart`)
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action startContainer = async id => {
    this.setError()

    try {
      await axios.put(`containers/${id}/start`)
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action stopContainer = async id => {
    this.setError()

    try {
      await axios.put(`containers/${id}/stop`)
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action killContainer = async id => {
    this.setError()

    try {
      await axios.put(`containers/${id}/kill`)
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action pauseContainer = async id => {
    this.setError()

    try {
      await axios.put(`containers/${id}/pause`)
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action unpauseContainer = async id => {
    this.setError()

    try {
      await axios.put(`containers/${id}/unpause`)
      this.loadContainers()
    }
    catch(e) {
      this.setError(e)
    }
  }
}
