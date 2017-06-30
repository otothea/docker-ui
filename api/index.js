const {Router}   = require('express')
const images     = require('./images')
const containers = require('./containers')
const volumes    = require('./volumes')
const networks   = require('./networks')
const auth       = require('./auth')

const router = module.exports = new Router()

router.post  ('/auth', auth.login)
router.delete('/auth', auth.logout)

router.get   ('/images',       auth.middleware, images.list)
router.get   ('/images/:id',   auth.middleware, images.read)
router.delete('/images/:id',   auth.middleware, images.destroy)
router.post  ('/images/prune', auth.middleware, images.prune)

router.get   ('/containers',             auth.middleware, containers.list)
router.get   ('/containers/:id',         auth.middleware, containers.read)
router.put   ('/containers/:id/rename',  auth.middleware, containers.rename)
router.put   ('/containers/:id/restart', auth.middleware, containers.restart)
router.put   ('/containers/:id/start',   auth.middleware, containers.start)
router.put   ('/containers/:id/stop',    auth.middleware, containers.stop)
router.put   ('/containers/:id/kill',    auth.middleware, containers.kill)
router.put   ('/containers/:id/pause',   auth.middleware, containers.pause)
router.put   ('/containers/:id/unpause', auth.middleware, containers.unpause)
router.delete('/containers/:id',         auth.middleware, containers.destroy)
router.post   ('/containers/prune',      auth.middleware, containers.prune)

router.get   ('/volumes',       auth.middleware, volumes.list)
router.post  ('/volumes',       auth.middleware, volumes.create)
router.get   ('/volumes/:id',   auth.middleware, volumes.read)
router.delete('/volumes/:id',   auth.middleware, volumes.destroy)
router.post  ('/volumes/prune', auth.middleware, volumes.prune)

router.get   ('/networks',       auth.middleware, networks.list)
router.post  ('/networks',       auth.middleware, networks.create)
router.get   ('/networks/:id',   auth.middleware, networks.read)
router.delete('/networks/:id',   auth.middleware, networks.destroy)
router.post  ('/networks/prune', auth.middleware, networks.prune)

router.use('*', (req, res) => {
  res.status(404).send({message: 'Not found'})
})

router.use((req, res, err) => {
  res.status(500).send({message: 'Internal server error'})
})
