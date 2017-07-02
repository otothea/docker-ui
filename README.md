[![GitHub version](https://badge.fury.io/gh/otothea%2Fdocker-ui.svg)](https://badge.fury.io/gh/otothea%2Fdocker-ui)
[![GitHub downloads](https://img.shields.io/github/downloads/otothea/docker-ui/total.svg)](https://github.com/otothea/docker-ui)
[![Dependencies](https://david-dm.org/otothea/docker-ui.svg)](https://david-dm.org/otothea/docker-ui)
[![Dev dependencies](https://david-dm.org/otothea/docker-ui/dev-status.svg)](https://david-dm.org/otothea/docker-ui?type=dev)

# Docker UI

Docker UI is a web app for viewing and managing Docker images, containers, volumes, etc in a web browser.

This project is also meant to serve as a working example of how to build a full-stack web app using:

- NodeJS
- ExpressJS
- ReactJS
- MobX
- FuseBox

[![Docker UI Screenshot](https://raw.githubusercontent.com/otothea/docker-ui/master/screenshot.png)](https://raw.githubusercontent.com/otothea/docker-ui/master/screenshot.png)

## Usage

### Production (Docker)

Pull the image

```bash
docker pull otothea/docker-ui
```

Run it

```bash
docker run -d -p 9898:9898 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name docker-ui \
  otothea/docker-ui
```

Run it with authentication (see [environment variables](#environment-variables))

```bash
docker run -d -p 9898:9898 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name docker-ui \
  -e DOCKER_UI_HTTPS=1 \
  -e DOCKER_UI_USER=username \
  -e DOCKER_UI_PASS=password \
  -e DOCKER_UI_SECRET=supersecretsessionkey \
  otothea/docker-ui
```

### Production (Node)

Clone the repository

```bash
git clone https://github.com/otothea/docker-ui.git
```

Change to the repository directory

```bash
cd docker-ui
```

Install the production dependencies

```bash
npm install --prod
```

Copy the config and adjust as needed (see [config options](#config-options))

```bash
cp config.example.js config.js
```

Start the server

```bash
npm run prod
```

### Development

Clone the repository

```bash
git clone https://github.com/otothea/docker-ui.git
```

Change to the repository directory

```bash
cd docker-ui
```

Install the dependencies 

```bash
npm install
```

Copy the config and adjust as needed (see [config options](#config-options))

```bash
cp config.example.js config.js
```

Start the client

```bash
npm run watch
```

Start the server

```bash
npm start
```

## Config Options

- **host** `string` - the hostname the API listens on
- **port** `number` - the port the API listens on
- **[debugger]** `number` - the port the debugger listens on (required if dev)
- **[https]** `boolean` - force https
- **[httpsProto]** `boolean` - trust `x-forwarded-proto` header (only set to `true` if you know you need this)
- **[user]** `string` - the username to access the UI
- **[pass]** `string` - the password to access the UI (required if `user` is set)
- **[secret]** `string` - the express session key (required if `user` is set)

## Environment Variables

- **DOCKER_UI_HOST** - override config.host
- **DOCKER_UI_PORT** - override config.port
- **DOCKER_UI_DEBUGGER** - override config.debugger
- **DOCKER_UI_HTTPS** - override config.https
- **DOCKER_UI_HTTPS_PROTO** - override config.httpsProto
- **DOCKER_UI_USER** - override config.user
- **DOCKER_UI_PASS** - override config.pass
- **DOCKER_UI_SECRET** - override config.secret

## Testing

There are currently no tests.

## Contributing

Pull requests are welcome.
