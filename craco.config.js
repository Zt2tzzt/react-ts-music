/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
