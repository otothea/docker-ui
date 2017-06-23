const http = require('http')

module.exports = function request(method = 'get', path = '', options = {}) {
  options = Object.assign(options, {
    socketPath: '/var/run/docker.sock',
    path: `/v1.29/${path}`,
  })

  return new Promise(resolve => {
    const req = http[method](options, res => {
      res.setEncoding('utf8')

      let rawData = ''
      res.on('data', chunk => {
        rawData += chunk
      })

      res.on('end', () => {
        resolve(JSON.parse(rawData))
      })
    })

    req.on('error', e => {
      reject(e)
    })

    req.end()
  })
}
