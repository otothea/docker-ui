const http = require('http')

module.exports = function request(method = 'get', path = '', data) {
  const options = {
    method:     method,
    socketPath: '/var/run/docker.sock',
    path:       `/v1.29/${path}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    },
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let rawData = ''

      res.on('data', chunk => {
        rawData += chunk
      })

      res.on('end', () => {
        let data
        try {
          data = JSON.parse(rawData)
        }
        catch(e) {
          data = {message: rawData}
        }

        if (res.statusCode >= 300) {
          return reject(data)
        }

        resolve(data)
      })
    })

    req.on('error', e => {
      reject(e)
    })

    if (data) {
      req.write(JSON.stringify(data))
    }

    req.end()
  })
}
