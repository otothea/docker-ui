const bodyParser = require('body-parser')
const express    = require('express')
const http       = require('http')
const path       = require('path')
const api        = require('./api')
const config     = require('./config')

const app    = express()
const server = http.createServer(app)
const port   = process.env.DOCKER_UI_PORT || config.port || 9898
const host   = process.env.DOCKER_UI_HOST || config.host || 'localhost'
const assets = process.env.NODE_ENV === 'production' ? 'dist' : 'build'

// Add static files
app.use(express.static(path.join(__dirname, assets)))

// Add body parse middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Route to the api
app.use('/api/v1', api)

// Route to the index file
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, `${assets}/index.html`))
})

// Start the server
server.listen(port, host, err => {
  if (err) throw err
  console.log(`Listening ${host}:${port}`)
})
