const {Router} = require('express')
const request = require('../lib/request')

module.exports = router = new Router()

router.get('/images', async (req, res) => {
  try {
    res.send(await request('get', 'images/json'))
  }
  catch(e) {
    res.status(500).send(e)
  }
})

router.get('/containers', async (req, res) => {
  try {
    res.send(await request('get', 'containers/json'))
  }
  catch(e) {
    res.status(500).send(e)
  }
})

router.get('/volumes', async (req, res) => {
  try {
    res.send((await request('get', 'volumes')).Volumes)
  }
  catch(e) {
    res.status(500).send(e)
  }
})
