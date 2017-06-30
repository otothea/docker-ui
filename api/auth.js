const config = require('config')

module.exports = {
  middleware,
  login,
  logout,
}

function middleware(req, res, next) {
  if ((process.env.DOCKER_UI_USER || config.user) && !req.session.auth) {
    return res.status(403).send()
  }
  next()
}

function login(req, res) {
  const user = process.env.DOCKER_UI_USER || config.user
  const pass = process.env.DOCKER_UI_PASS || config.pass

  if (user === req.body.user && pass === req.body.pass) {
    req.session.auth = true
    req.session.save(() => {
      res.send()
    })
  }
  else {
    res.status(401).send({message: 'Invalid username and/or password'})
  }
}

function logout(req, res) {
  req.session.regenerate(() => {
    res.send()
  })
}
