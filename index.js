const bodyParser = require('body-parser')
const express    = require('express')
const http       = require('http')
const api        = require('./api')
const config     = require('./config')

const app    = express()
const server = http.createServer(app)
const port   = config.port || 9898
const host   = config.host || 'localhost'

// Add static files
app.use(express.static(__dirname + '/build'))

// Add body parse middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Route to the api
app.use('/api/v1', api)

// Route to the index file
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

// Start the server
server.listen(port, host, err => {
  if (err) throw err
  console.log(`Listening ${host}:${port}`)
})
