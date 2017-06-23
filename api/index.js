const {Router} = require('express')
const images = require('./images')
const containers = require('./containers')
const volumes = require('./volumes')

const router = module.exports = new Router()

router.get('/images', images.list)
router.delete('/images/:id', images.destroy)

router.get('/containers', containers.list)
router.delete('/containers/:id', containers.destroy)

router.get('/volumes', volumes.list)
router.post('/volumes', volumes.create)
router.delete('/volumes/:id', volumes.destroy)
