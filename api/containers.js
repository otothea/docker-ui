const request = require('lib/request')

module.exports = {
  list,
  read,
  rename,
  destroy,
  prune,
  restart,
  start,
  stop,
  kill,
  pause,
  unpause,
}

async function list(req, res) {
  try {
    res.send(await request('get', 'containers/json?all=true'))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function read(req, res) {
  try {
    res.send(await request('get', `containers/${req.params.id}/json`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function rename(req, res) {
  try {
    res.send(await request('post', `containers/${req.params.id}/rename?name=${req.body.name}`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function destroy(req, res) {
  try {
    res.send(await request('delete', `containers/${req.params.id}`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function prune(req, res) {
  try {
    res.send(await request('post', 'containers/prune'))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function restart(req, res) {
  try {
    res.send(await request('post', `containers/${req.params.id}/restart`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function start(req, res) {
  try {
    res.send(await request('post', `containers/${req.params.id}/start`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function stop(req, res) {
  try {
    res.send(await request('post', `containers/${req.params.id}/stop`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function kill(req, res) {
  try {
    res.send(await request('post', `containers/${req.params.id}/kill`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function pause(req, res) {
  try {
    res.send(await request('post', `containers/${req.params.id}/pause`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function unpause(req, res) {
  try {
    res.send(await request('post', `containers/${req.params.id}/unpause`))
  }
  catch(e) {
    res.status(500).send(e)
  }
}
