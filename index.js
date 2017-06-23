const express = require('express')
const http    = require('http')
const api     = require('./api')
const config  = require('./config')

const app    = express()
const server = http.createServer(app)
const port   = config.port || 9898
const host   = config.host || 'localhost'

app.use(express.static(__dirname + '/build'))
app.use('/api/v1', api)
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

server.listen(port, host, err => {
  if (err) return console.error(err)
  console.log(`Listening ${host}:${port}`)
})
