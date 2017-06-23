const request = require('../lib/request')

module.exports = {
  list,
  destroy,
}

async function list(req, res) {
  try {
    res.send(await request('get', 'images/json'))
  }
  catch(e) {
    res.status(500).send(e)
  }
}

async function destroy(req, res) {
  try {
    const response = await request('delete', `images/${req.params.id}`)

    res.send(response)
  }
  catch(e) {
    res.status(500).send(e)
  }
}
