const fs = require('fs')

try {
  fs.symlinkSync('../api', 'node_modules/api', 'dir')
} catch (e) {
  if (e.code !== 'EEXIST') throw e
}

try {
  fs.symlinkSync('../lib', 'node_modules/lib', 'dir')
} catch (e) {
  if (e.code !== 'EEXIST') throw e
}

try {
  fs.symlinkSync('../config.js', 'node_modules/config.js')
} catch (e) {
  if (e.code !== 'EEXIST') throw e
}
