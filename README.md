# Docker UI

Docker UI is a web app for viewing and managing Docker images, containers, volumes, etc in a web browser.

This project is also meant to serve as a working example of how to build a web app using the following tech stack:

- NodeJS
- ExpressJS
- ReactJS
- FuseBox

### Usage

#### Production

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

Copy the config (and adjust as needed in a text editor)

```bash
cp config.example.js config.js
```

Start the server

```bash
npm start
```

#### Development

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

Copy the config (and adjust as needed in a text editor)

```bash
cp config.example.js config.js
```

Start the client (optional)

```bash
npm run watch
```

Start the server

```bash
npm start
```

#### Testing

There are currently no tests.

#### Contributing

Pull requests are welcome.
