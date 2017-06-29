const request = require('lib/request')

module.exports = {
  list,
  create,
  read,
  destroy,
  prune,
}

async function list(req, res) {
  try {
    res.send(await request('get', 'networks'))
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
      Labels: req.body.labels,
    }

    res.send(await request('post', 'networks/create', body))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function read(req, res) {
  try {
    res.send(await request('get', `networks/${req.params.id}`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function destroy(req, res) {
  try {
    res.send(await request('delete', `networks/${req.params.id}`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function prune(req, res) {
  try {
    res.send(await request('post', 'networks/prune'))
  }
  catch(e) {
    res.status(500).send(e)
  }
}
