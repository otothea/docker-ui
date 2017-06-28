const {BabelPlugin} = require('fuse-box')
const {CSSPlugin} = require('fuse-box')
const {FuseBox} = require('fuse-box')
const {JSONPlugin} = require('fuse-box')
// const {QuantumPlugin} = require('fuse-box')
const {SassPlugin} = require('fuse-box')
const {WebIndexPlugin} = require('fuse-box')
const ESLintPlugin = require('fuse-box-eslint-plugin')
const config = require('./config')

module.exports = production => {
  const fuse = new FuseBox({
    homeDir: 'client',
    sourceMaps: !production,
    hash: production,
    output: `${production ? 'dist' : 'build'}/$name.js`,
    plugins: [
      ['.json', JSONPlugin()],
      ['.scss', SassPlugin(), CSSPlugin()],
      ['.js', ESLintPlugin(), BabelPlugin()],
      WebIndexPlugin({
        title: 'Docker UI',
        template: 'client/index.html'
      }),
      // production && QuantumPlugin({
      //   removeExportsInterop: false,
      //   uglify: true,
      // }),
    ],
    alias: {
      stores: '~/stores',
    },
  })

  const vendor = fuse.bundle('vendor').instructions('~ index.js')
  const app = fuse.bundle('app').instructions('> [index.js]')

  if (!production) {
    fuse.dev({
      port: process.env.DOCKER_UI_DEBUGGER || config.debugger || 9999,
      httpServer: false,
    })

    vendor.hmr().watch()
    app.hmr().watch()
  }

  return fuse
}
