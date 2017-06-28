const {Router} = require('express')
const images = require('./images')
const containers = require('./containers')
const volumes = require('./volumes')

const router = module.exports = new Router()

router.get('/images', images.list)
router.get('/images/:id', images.read)
router.delete('/images/:id', images.destroy)
router.post('/images/prune', images.prune)

router.get('/containers', containers.list)
router.get('/containers/:id', containers.read)
router.delete('/containers/:id', containers.destroy)
router.post('/containers/prune', containers.prune)

router.get('/volumes', volumes.list)
router.post('/volumes', volumes.create)
router.get('/volumes/:id', volumes.read)
router.delete('/volumes/:id', volumes.destroy)
router.post('/volumes/prune', volumes.prune)
