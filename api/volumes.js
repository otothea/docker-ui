const request = require('../lib/request')

module.exports = {
  list,
  create,
  read,
  destroy,
  prune,
}

async function list(req, res) {
  try {
    res.send((await request('get', 'volumes')).Volumes)
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function create(req, res) {
  try {
    const body = {
      Name: req.body.name,
      Driver: req.body.driver,
      DriverOpts: req.body.driver_opts,
      Labels: req.body.labels,
    }

    const response = await request('post', 'volumes/create', body)

    res.send(response)
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function read(req, res) {
  try {
    const response = await request('get', `volumes/${req.params.id}`)

    res.send(response)
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function destroy(req, res) {
  try {
    const response = await request('delete', `volumes/${req.params.id}`)

    res.send(response)
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function prune(req, res) {
  try {
    const response = await request('post', 'volumes/prune')

    res.send(response)
  }
  catch(e) {
    res.status(500).send(e)
  }
}
